package handlers

import (
	"net/http"

	"arcanum/internal/database"
	"arcanum/internal/models"

	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	userRepo *database.UserRepository
}

func NewUserHandler(userRepo *database.UserRepository) *UserHandler {
	return &UserHandler{
		userRepo: userRepo,
	}
}

type UpdateProfileRequest struct {
	Name string `json:"name" binding:"required"`
}

// GetProfile возвращает профиль текущего пользователя
func (h *UserHandler) GetProfile(c *gin.Context) {
	// Получаем ID пользователя из контекста (установлен middleware)
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	user, err := h.userRepo.FindByID(c.Request.Context(), userID.(string))
	if err != nil {
		if err == database.ErrUserNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user profile"})
		return
	}

	// Убираем пароль из ответа
	user.PasswordHash = ""

	c.JSON(http.StatusOK, user)
}

// UpdateProfile обновляет профиль пользователя
func (h *UserHandler) UpdateProfile(c *gin.Context) {
	// Получаем ID пользователя из контекста
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var req UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request: " + err.Error()})
		return
	}

	// Получаем текущего пользователя
	user, err := h.userRepo.FindByID(c.Request.Context(), userID.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get user"})
		return
	}

	// Обновляем данные
	user.Name = req.Name

	if err := h.userRepo.Update(c.Request.Context(), user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	// Убираем пароль из ответа
	user.PasswordHash = ""

	c.JSON(http.StatusOK, user)
}
