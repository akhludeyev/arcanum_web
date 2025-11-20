package calculator

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

// MatrixFate представляет результат расчета Матрицы Судьбы
type MatrixFate struct {
	Main      int    `json:"main"`
	Social    int    `json:"social"`
	Spiritual int    `json:"spiritual"`
	Tail      int    `json:"tail"`
	BirthDate string `json:"birthDate"`
}

// CalculateMatrixFate рассчитывает Матрицу Судьбы по дате рождения
func CalculateMatrixFate(birthDate string) (*MatrixFate, error) {
	// Валидация формата даты (DD.MM.YYYY)
	if err := validateDateFormat(birthDate); err != nil {
		return nil, err
	}

	// Извлекаем все цифры из даты
	digits := extractDigits(birthDate)
	if len(digits) == 0 {
		return nil, fmt.Errorf("no digits found in birth date")
	}

	// Сумма всех цифр
	total := sumDigits(digits)

	// Основное предназначение (main)
	main := reduceTo22(total)
	if main == 0 {
		main = 22
	}

	// Извлекаем день и год
	parts := strings.Split(birthDate, ".")
	day, _ := strconv.Atoi(parts[0])
	year, _ := strconv.Atoi(parts[2])

	// Социальная реализация (social)
	social := reduceTo22(day + year)

	// Духовный путь (spiritual)
	spiritual := reduceTo22(main + social)

	// Кармический хвост (tail)
	tail := reduceTo22(total - day)

	return &MatrixFate{
		Main:      main,
		Social:    social,
		Spiritual: spiritual,
		Tail:      tail,
		BirthDate: birthDate,
	}, nil
}

// reduceTo22 приводит число к диапазону 1-22
func reduceTo22(num int) int {
	if num <= 0 {
		return 0
	}
	if num <= 22 {
		return num
	}

	// Суммируем цифры числа
	sum := 0
	for num > 0 {
		sum += num % 10
		num /= 10
	}

	return reduceTo22(sum)
}

// extractDigits извлекает все цифры из строки
func extractDigits(s string) []int {
	var digits []int
	for _, char := range s {
		if char >= '0' && char <= '9' {
			digit, _ := strconv.Atoi(string(char))
			digits = append(digits, digit)
		}
	}
	return digits
}

// sumDigits суммирует все элементы среза
func sumDigits(digits []int) int {
	sum := 0
	for _, d := range digits {
		sum += d
	}
	return sum
}

// validateDateFormat проверяет формат даты DD.MM.YYYY
func validateDateFormat(dateStr string) error {
	parts := strings.Split(dateStr, ".")
	if len(parts) != 3 {
		return fmt.Errorf("invalid date format, expected DD.MM.YYYY")
	}

	day, err := strconv.Atoi(parts[0])
	if err != nil || day < 1 || day > 31 {
		return fmt.Errorf("invalid day: %s", parts[0])
	}

	month, err := strconv.Atoi(parts[1])
	if err != nil || month < 1 || month > 12 {
		return fmt.Errorf("invalid month: %s", parts[1])
	}

	year, err := strconv.Atoi(parts[2])
	if err != nil || year < 1900 || year > time.Now().Year() {
		return fmt.Errorf("invalid year: %s", parts[2])
	}

	return nil
}

// GetArcanaName возвращает название аркана по номеру
func GetArcanaName(number int) string {
	arcanaNames := map[int]string{
		1:  "Маг",
		2:  "Верховная Жрица",
		3:  "Императрица",
		4:  "Император",
		5:  "Иерофант",
		6:  "Влюбленные",
		7:  "Колесница",
		8:  "Справедливость",
		9:  "Отшельник",
		10: "Колесо Фортуны",
		11: "Сила",
		12: "Повешенный",
		13: "Смерть",
		14: "Умеренность",
		15: "Дьявол",
		16: "Башня",
		17: "Звезда",
		18: "Луна",
		19: "Солнце",
		20: "Суд",
		21: "Мир",
		22: "Шут",
	}

	if name, ok := arcanaNames[number]; ok {
		return name
	}
	return "Неизвестный аркан"
}
