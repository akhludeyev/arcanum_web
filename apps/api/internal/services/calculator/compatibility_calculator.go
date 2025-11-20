package calculator

import (
	"fmt"
	"math"
)

// CompatibilityResult представляет результат расчета совместимости
type CompatibilityResult struct {
	OverallScore    int              `json:"overallScore"`
	KarmicTask      int              `json:"karmicTask"`
	DestinyArcana   int              `json:"destinyArcana"`
	Aspects         Aspects          `json:"aspects"`
	Strengths       []string         `json:"strengths"`
	Challenges      []string         `json:"challenges"`
	Recommendations []string         `json:"recommendations"`
	ArcanaNames     ArcanaNames      `json:"arcanaNames"`
}

// Aspects представляет аспекты совместимости
type Aspects struct {
	Spiritual int `json:"spiritual"`
	Emotional int `json:"emotional"`
	Material  int `json:"material"`
	Karmic    int `json:"karmic"`
}

// ArcanaNames представляет названия арканов
type ArcanaNames struct {
	KarmicTask    string `json:"karmicTask"`
	DestinyArcana string `json:"destinyArcana"`
}

// CalculateCompatibility рассчитывает совместимость двух людей
func CalculateCompatibility(person1, person2 *MatrixFate) (*CompatibilityResult, error) {
	if person1 == nil || person2 == nil {
		return nil, fmt.Errorf("both persons must be provided")
	}

	// 1. Кармическая задача пары
	karmicTask := reduceTo22(person1.Main + person2.Main)

	// 2. Аркан предназначения пары
	destinyArcana := reduceTo22(person1.Spiritual + person2.Spiritual)

	// 3. Духовная совместимость (близость духовных путей)
	spiritualDiff := int(math.Abs(float64(person1.Spiritual - person2.Spiritual)))
	var spiritual int
	switch {
	case spiritualDiff <= 3:
		spiritual = 90
	case spiritualDiff <= 7:
		spiritual = 70
	default:
		spiritual = 50
	}

	// 4. Эмоциональная совместимость (основные арканы)
	var emotional int
	if person1.Main == person2.Main {
		emotional = 100
	} else if math.Abs(float64(person1.Main-person2.Main)) <= 5 {
		emotional = 80
	} else {
		emotional = 60
	}

	// 5. Материальная совместимость (социальные арканы)
	var material int
	if person1.Social == person2.Social {
		material = 100
	} else if math.Abs(float64(person1.Social-person2.Social)) <= 4 {
		material = 75
	} else {
		material = 55
	}

	// 6. Кармическая связь (хвосты отражают друг друга)
	var karmic int
	if person1.Tail == person2.Main || person2.Tail == person1.Main {
		karmic = 95
	} else if person1.Tail == person2.Spiritual || person2.Tail == person1.Spiritual {
		karmic = 85
	} else {
		karmic = 60
	}

	// 7. Бонусы за благоприятные кармические задачи
	favorableTasks := []int{7, 11, 17, 19, 20}
	taskBonus := 5
	for _, task := range favorableTasks {
		if karmicTask == task {
			taskBonus = 15
			break
		}
	}

	// 8. Общая совместимость
	baseScore := (spiritual + emotional + material + karmic) / 4
	overallScore := int(math.Min(100, float64(baseScore+taskBonus)))

	// 9. Определение сильных сторон
	strengths := make([]string, 0)
	if spiritual >= 80 {
		strengths = append(strengths, "Глубокое духовное понимание")
	}
	if emotional >= 80 {
		strengths = append(strengths, "Эмоциональное единство")
	}
	if karmic >= 85 {
		strengths = append(strengths, "Сильная кармическая связь")
	}
	for _, task := range favorableTasks {
		if karmicTask == task {
			strengths = append(strengths, fmt.Sprintf("Благоприятная кармическая задача: %s", GetArcanaName(karmicTask)))
			break
		}
	}

	// 10. Определение вызовов
	challenges := make([]string, 0)
	if spiritualDiff > 10 {
		challenges = append(challenges, "Разные духовные пути требуют взаимного уважения")
	}
	if math.Abs(float64(person1.Main-person2.Main)) > 10 {
		challenges = append(challenges, "Разные жизненные приоритеты - источник роста")
	}
	if karmicTask == 16 {
		challenges = append(challenges, "Кармическая задача Башня требует совместного преодоления кризисов")
	}

	// 11. Рекомендации
	recommendations := []string{
		fmt.Sprintf("Работайте вместе над задачей: %s", GetArcanaName(karmicTask)),
		fmt.Sprintf("Ваше общее предназначение связано с энергией: %s", GetArcanaName(destinyArcana)),
	}

	return &CompatibilityResult{
		OverallScore:  overallScore,
		KarmicTask:    karmicTask,
		DestinyArcana: destinyArcana,
		Aspects: Aspects{
			Spiritual: spiritual,
			Emotional: emotional,
			Material:  material,
			Karmic:    karmic,
		},
		Strengths:       strengths,
		Challenges:      challenges,
		Recommendations: recommendations,
		ArcanaNames: ArcanaNames{
			KarmicTask:    GetArcanaName(karmicTask),
			DestinyArcana: GetArcanaName(destinyArcana),
		},
	}, nil
}
