package calculator

import (
	"fmt"
)

// PythagorasMatrix представляет психоматрицу Пифагора
type PythagorasMatrix struct {
	Cells map[int]int `json:"cells"`
	Lines Lines       `json:"lines"`
}

// Lines представляет линии психоматрицы
type Lines struct {
	Rows      []int `json:"rows"`
	Columns   []int `json:"columns"`
	Diagonals []int `json:"diagonals"`
}

// CalculatePythagoras рассчитывает психоматрицу Пифагора по дате рождения
func CalculatePythagoras(birthDate string) (*PythagorasMatrix, error) {
	// Валидация формата даты
	if err := validateDateFormat(birthDate); err != nil {
		return nil, err
	}

	// Извлекаем цифры из даты (без нулей)
	digits := extractDigits(birthDate)
	nonZeroDigits := make([]int, 0)
	for _, d := range digits {
		if d > 0 {
			nonZeroDigits = append(nonZeroDigits, d)
		}
	}

	// Подсчет количества каждой цифры 1-9
	cells := make(map[int]int)
	for i := 1; i <= 9; i++ {
		cells[i] = 0
	}

	for _, digit := range nonZeroDigits {
		if digit >= 1 && digit <= 9 {
			cells[digit]++
		}
	}

	// Расчет линий
	rows := []int{
		cells[1] + cells[2] + cells[3], // Целеустремленность
		cells[4] + cells[5] + cells[6], // Семья, стабильность
		cells[7] + cells[8] + cells[9], // Привычки, таланты
	}

	columns := []int{
		cells[1] + cells[4] + cells[7], // Самооценка
		cells[2] + cells[5] + cells[8], // Материальность
		cells[3] + cells[6] + cells[9], // Талант
	}

	diagonals := []int{
		cells[1] + cells[5] + cells[9], // Духовность
		cells[3] + cells[5] + cells[7], // Темперамент
	}

	return &PythagorasMatrix{
		Cells: cells,
		Lines: Lines{
			Rows:      rows,
			Columns:   columns,
			Diagonals: diagonals,
		},
	}, nil
}

// InterpretPythagoras возвращает интерпретацию психоматрицы
func InterpretPythagoras(matrix *PythagorasMatrix) map[string]string {
	interpretations := make(map[string]string)

	// Интерпретация характера (первая строка)
	switch {
	case matrix.Lines.Rows[0] == 0:
		interpretations["character"] = "Отсутствие целеустремленности. Важно развивать силу воли."
	case matrix.Lines.Rows[0] <= 2:
		interpretations["character"] = "Слабая целеустремленность. Нужна мотивация извне."
	case matrix.Lines.Rows[0] <= 4:
		interpretations["character"] = "Средняя целеустремленность. Достигает целей при должных усилиях."
	case matrix.Lines.Rows[0] <= 6:
		interpretations["character"] = "Сильная целеустремленность. Упорно идет к своим целям."
	default:
		interpretations["character"] = "Очень сильная целеустремленность. Лидерские качества."
	}

	// Интерпретация семейности (вторая строка)
	switch {
	case matrix.Lines.Rows[1] == 0:
		interpretations["family"] = "Слабая привязанность к семье. Важно развивать семейные ценности."
	case matrix.Lines.Rows[1] <= 2:
		interpretations["family"] = "Средняя семейность. Баланс между личным и семейным."
	case matrix.Lines.Rows[1] <= 4:
		interpretations["family"] = "Сильная семейность. Семья на первом месте."
	default:
		interpretations["family"] = "Очень сильная семейность. Семья - главная ценность."
	}

	// Интерпретация талантов (третья строка)
	switch {
	case matrix.Lines.Rows[2] == 0:
		interpretations["talents"] = "Таланты скрыты. Требуется самопознание."
	case matrix.Lines.Rows[2] <= 2:
		interpretations["talents"] = "Есть таланты, но требуется развитие."
	case matrix.Lines.Rows[2] <= 4:
		interpretations["talents"] = "Выраженные таланты. Хорошие способности."
	default:
		interpretations["talents"] = "Множество талантов. Творческая натура."
	}

	// Интерпретация самооценки (первый столбец)
	switch {
	case matrix.Lines.Columns[0] == 0:
		interpretations["selfEsteem"] = "Низкая самооценка. Важно работать над уверенностью."
	case matrix.Lines.Columns[0] <= 2:
		interpretations["selfEsteem"] = "Средняя самооценка. Периодические сомнения."
	case matrix.Lines.Columns[0] <= 4:
		interpretations["selfEsteem"] = "Хорошая самооценка. Уверенность в себе."
	default:
		interpretations["selfEsteem"] = "Очень высокая самооценка. Возможна самоуверенность."
	}

	return interpretations
}
