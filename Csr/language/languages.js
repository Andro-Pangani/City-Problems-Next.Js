export const languages = {
  headerNavigation: {
    English: {
      all: "All",
      schools: "SCHOOLS",
      recreational: "RECREATIONAL AREAS",
      kids: "KIDS",
      transport: "TRANSPORT",
      pollution: "POLLUTION",
      construction: "CONSTRUCTION",
      food: "FOOD",
      upload: "UPLOAD",
    },

    Georgian: {
      all: "ყველა",
      schools: "სკოლები",
      recreational: "სარეკრეაციო სივრცეები",
      transport: "ტრანსპორტი",
      kids: "ბავშვები",
      pollution: "დაბინძურება",
      construction: "მშენებლობა",
      food: "საკვები",
      upload: "ატვირთვა",
    },
    Russian: {
      all: "Все",
      schools: "Школы",
      recreational: "Рекреационная зона",
      transport: "Транспорт",
      kids: "Дети",
      pollution: "Загрязнение окружающей среды",
      construction: "Строительство",
      food: "Питание",
      upload: "Добавить",
    },
  },
  aqiSection: {
    headerTitle: {
      Georgian: "ჰაერის ხარისხი",
      English: "AIR QUALITI",
      Russian: "Качество Воздуха",
    },
    recomendations: {
      Russian: {
        station_off: {
          level: "Нет Информации",
          recomendations: "Будьте Осторожны",
        },
        good: {
          level: "Хорошо",
          recomendations: `Качество воздуха удовлетворительное`,
        },
        fair: {
          level: "Средне",
          recomendations: `Особо чувствительным лицам рекомендуется 
      сократить длительную и тяжолую физическую активность на открытом воздухе`,
        },
        moderate: {
          level: "Вредно Для Уязвимых Групп",
          recomendations: `Детям, лицам с сердечно сосудистыми заболеваниями и лицам приклонного возраста сократить длительную и тяжолую физическую активность на открытом воздухе.`,
        },
        poor: {
          level: "Вредно",
          recomendations: `Вредно. Избегайте физических нагрузок на улице, закройте окна, чтобы избежать загрязнения наружным воздухом`,
        },
        very_poor: {
          level: "Очень Вредно",
          recomendations: `Очень вредно. Избегайте нагрузок на улице, закройте окна, чтобы избежать загрязнения наружным воздухом, носите маску на улице`,
        },
      },
      Georgian: {
        station_off: {
          level: "არ არის მონაცემები",
          recomendations: "გაუფრთხილდით საკუთარ და სხვის ჯანმრთელობას",
        },
        good: {
          level: "კარგი",
          recomendations: `ჯანდაცვით რეკომენდაციებს არ საჭიროებს`,
        },
        fair: {
          level: "საშუალო",
          recomendations: `განსაკუთრებით მგრძნობიარე ადამიანებმა 
      უნდა შეამცირონ გახანგრძლივებული ან დატვირთული გარე 
      ფიზიკური აქტივობა`,
        },
        moderate: {
          level: "მავნე სენსიტიურ ჯგუფებისთვის",
          recomendations: `შემდეგმა ჯგუფებმა უნდა შეამცირონ გახანგრძლივებული ან დატვირთული გარე ფიზიკური აქტივობა:
      გულის ან ფილტვის დაავადებების მქონე პირები
      ბავშვები და ხანდაზმულები`,
        },
        poor: {
          level: "ცუდი",
          recomendations: `ყველამ შეიძლება განიცადოს ზემოქმედება ჯანმრთელობაზე; ხოლო, სენსიტიური ჯგუფების წევრები შესაძლებელია განიცდიდნენ უფრო სერიოზულ ზემოქმედებას, ვიდრე მოსახლეობა ზოგადად`,
        },
        very_poor: {
          level: "საგანგაშო",
          recomendations: `ჰაერის ხარისხი საგანგაშოა ჯანმრთელობისათვის; ყველამ შეიძლება განიცადოს სერიოზული ზეგავლენა ჯანრმთელობაზე.`,
        },
      },
      English: {
        station_off: {
          level: "Station is Off",
          recomendations: "Keep your self healthy",
        },
        good: {
          level: "Good",
          recomendations: `Air quality is considered satisfactory, 
      and air pollution poses little or no risk for health.`,
        },
        fair: {
          level: "Fair",
          recomendations: `Unusually sensitive people should consider 
      reducing prolonged or heavy exertion.`,
        },
        moderate: {
          level: "Moderate",
          recomendations: `Members of sensitive groups may experience health effects. 
      The general public is not likely to be affected.`,
        },
        poor: {
          level: "Bad",
          recomendations: `Everyone may begin to experience health effects; 
      members of sensitive groups may experience more serious health effects.`,
        },
        very_poor: {
          level: "Very Bad",
          recomendations: `Health alert: everyone may experience more serious health effects.`,
        },
      },
    },
  },
  formSection: {
    form: {
      problem: {
        Georgian: {
          type: "აირჩიეთ პრობლემის სახეობა",
          address: "მისამართი",
          address_label: "აირჩიეთ მისამართი რუქაზე ან შეიყვანეთ ხელით",
          comment: "კომენტარი",
          comment_label: "სურვილისამებრ დაურთეთ განმარტება",
          upload_button: "ატვირთვა",
        },
        English: {
          type: "Choose type of problem",
          address: "Address",
          address_label: "Choose location on the map or enter it by your self",
          comment: "Comment",
          comment_label: "You can leave your comment here",
          upload_button: "UPLOAD",
        },
        Russian: {
          type: "Выберите тип проблемы",
          address: "Адрес",
          address_label: "Найдите место на карте и в ис списка виберите адрес",
          comment: "Коментарий",
          comment_label: "Можете оставить свой коментарий",
          upload_button: "ЗАГРУЗИТЬ",
        },
      },
    },
  },
};
