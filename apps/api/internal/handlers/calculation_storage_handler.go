package handlers

import (
	"net/http"
	"time"

	"arcanum/internal/database"
	"arcanum/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CalculationStorageHandler struct {
	calcRepo *database.CalculationRepository
}

func NewCalculationStorageHandler(calcRepo *database.CalculationRepository) *CalculationStorageHandler {
	return &CalculationStorageHandler{
		calcRepo: calcRepo,
	}
}

type SaveCalculationRequest struct {
	Type       models.CalculationType `json:"type" binding:"required"`
	InputData  interface{}            `json:"inputData" binding:"required"`
	ResultData interface{}            `json:"resultData" binding:"required"`
}

// SaveCalculation сохраняет расчет пользователя
func (h *CalculationStorageHandler) SaveCalculation(c *gin.Context) {
	// Получаем ID пользователя из контекста
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var req SaveCalculationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request: " + err.Error()})
		return
	}

	// Создаем расчет
	calc := &models.Calculation{
		ID:         uuid.New().String(),
		UserID:     userID.(string),
		Type:       req.Type,
		InputData:  req.InputData,
		ResultData: req.ResultData,
		CreatedAt:  time.Now(),
	}

	if err := h.calcRepo.Create(c.Request.Context(), calc); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save calculation"})
		return
	}

	c.JSON(http.StatusCreated, calc)
}

// GetCalculations возвращает список расчетов пользователя
func (h *CalculationStorageHandler) GetCalculations(c *gin.Context) {
	// Получаем ID пользователя из контекста
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	// Опциональный фильтр по типу
	var calcType *models.CalculationType
	if typeParam := c.Query("type"); typeParam != "" {
		ct := models.CalculationType(typeParam)
		calcType = &ct
	}

	calculations, err := h.calcRepo.FindByUserID(c.Request.Context(), userID.(string), calcType)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get calculations"})
		return
	}

	if calculations == nil {
		calculations = []*models.Calculation{}
	}

	c.JSON(http.StatusOK, calculations)
}

// GetCalculation возвращает конкретный расчет
func (h *CalculationStorageHandler) GetCalculation(c *gin.Context) {
	// Получаем ID пользователя из контекста
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	calcID := c.Param("id")
	if calcID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Calculation ID is required"})
		return
	}

	calc, err := h.calcRepo.FindByID(c.Request.Context(), calcID)
	if err != nil {
		if err == database.ErrCalculationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Calculation not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get calculation"})
		return
	}

	// Проверяем, что расчет принадлежит пользователю
	if calc.UserID != userID.(string) {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	c.JSON(http.StatusOK, calc)
}

// DeleteCalculation удаляет расчет
func (h *CalculationStorageHandler) DeleteCalculation(c *gin.Context) {
	// Получаем ID пользователя из контекста
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	calcID := c.Param("id")
	if calcID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Calculation ID is required"})
		return
	}

	if err := h.calcRepo.Delete(c.Request.Context(), calcID, userID.(string)); err != nil {
		if err == database.ErrCalculationNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Calculation not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete calculation"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Calculation deleted successfully"})
}
