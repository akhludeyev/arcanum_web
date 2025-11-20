package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/akhludeyev/arcanum/api/internal/services/calculator"
)

type CalculationHandler struct{}

func NewCalculationHandler() *CalculationHandler {
	return &CalculationHandler{}
}

// CalculateMatrix godoc
// @Summary Calculate Matrix of Fate
// @Description Calculate Matrix of Fate based on birth date
// @Tags calculations
// @Accept json
// @Produce json
// @Param request body MatrixRequest true "Birth date"
// @Success 200 {object} MatrixResponse
// @Failure 400 {object} ErrorResponse
// @Router /api/v1/calculate/matrix [post]
func (h *CalculationHandler) CalculateMatrix(c *gin.Context) {
	var req MatrixRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "Invalid request body"})
		return
	}

	result, err := calculator.CalculateMatrixFate(req.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: err.Error()})
		return
	}

	// Добавляем названия арканов
	response := MatrixResponse{
		Success: true,
		Data: MatrixData{
			Main:      result.Main,
			Social:    result.Social,
			Spiritual: result.Spiritual,
			Tail:      result.Tail,
			ArcanaNames: ArcanaNames{
				Main:      calculator.GetArcanaName(result.Main),
				Social:    calculator.GetArcanaName(result.Social),
				Spiritual: calculator.GetArcanaName(result.Spiritual),
				Tail:      calculator.GetArcanaName(result.Tail),
			},
		},
	}

	c.JSON(http.StatusOK, response)
}

// CalculatePythagoras godoc
// @Summary Calculate Pythagoras Matrix
// @Description Calculate Pythagoras psychomatrix based on birth date
// @Tags calculations
// @Accept json
// @Produce json
// @Param request body MatrixRequest true "Birth date"
// @Success 200 {object} PythagorasResponse
// @Failure 400 {object} ErrorResponse
// @Router /api/v1/calculate/pythagoras [post]
func (h *CalculationHandler) CalculatePythagoras(c *gin.Context) {
	var req MatrixRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "Invalid request body"})
		return
	}

	result, err := calculator.CalculatePythagoras(req.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: err.Error()})
		return
	}

	interpretations := calculator.InterpretPythagoras(result)

	response := PythagorasResponse{
		Success: true,
		Data: PythagorasData{
			Cells:           result.Cells,
			Lines:           result.Lines,
			Interpretations: interpretations,
		},
	}

	c.JSON(http.StatusOK, response)
}

// CalculateCompatibility godoc
// @Summary Calculate Compatibility
// @Description Calculate compatibility between two people (Premium feature)
// @Tags calculations
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param request body CompatibilityRequest true "Two people's birth dates"
// @Success 200 {object} CompatibilityResponse
// @Failure 400 {object} ErrorResponse
// @Failure 403 {object} ErrorResponse
// @Router /api/v1/calculate/compatibility [post]
func (h *CalculationHandler) CalculateCompatibility(c *gin.Context) {
	var req CompatibilityRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "Invalid request body"})
		return
	}

	// Рассчитываем матрицы для обоих людей
	person1, err := calculator.CalculateMatrixFate(req.Person1.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "Invalid birth date for person 1"})
		return
	}

	person2, err := calculator.CalculateMatrixFate(req.Person2.BirthDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Error: "Invalid birth date for person 2"})
		return
	}

	// Рассчитываем совместимость
	result, err := calculator.CalculateCompatibility(person1, person2)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Error: err.Error()})
		return
	}

	response := CompatibilityResponse{
		Success: true,
		Data:    *result,
	}

	c.JSON(http.StatusOK, response)
}

// Request/Response types
type MatrixRequest struct {
	BirthDate string `json:"birthDate" binding:"required"`
}

type MatrixResponse struct {
	Success bool       `json:"success"`
	Data    MatrixData `json:"data"`
}

type MatrixData struct {
	Main        int         `json:"main"`
	Social      int         `json:"social"`
	Spiritual   int         `json:"spiritual"`
	Tail        int         `json:"tail"`
	ArcanaNames ArcanaNames `json:"arcanaNames"`
}

type ArcanaNames struct {
	Main      string `json:"main"`
	Social    string `json:"social"`
	Spiritual string `json:"spiritual"`
	Tail      string `json:"tail"`
}

type PythagorasResponse struct {
	Success bool            `json:"success"`
	Data    PythagorasData  `json:"data"`
}

type PythagorasData struct {
	Cells           map[int]int       `json:"cells"`
	Lines           calculator.Lines  `json:"lines"`
	Interpretations map[string]string `json:"interpretations"`
}

type CompatibilityRequest struct {
	Person1 PersonData `json:"person1" binding:"required"`
	Person2 PersonData `json:"person2" binding:"required"`
}

type PersonData struct {
	BirthDate string `json:"birthDate" binding:"required"`
	Name      string `json:"name"`
}

type CompatibilityResponse struct {
	Success bool                            `json:"success"`
	Data    calculator.CompatibilityResult  `json:"data"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
