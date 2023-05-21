export default {
    data () {
        return {
            titleTask: [
                'Название',
                'Описание',
                'Дата создания',
                'Статус'
            ],
            allTask: null,
            isVisible: false
        }
    },
    methods: {
        async getAllTask() {
            await fetch('http://localhost:3000/tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('cachedData', JSON.stringify(data));
                    this.processData(data);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                    const cachedData = localStorage.getItem('cachedData');
                    if (cachedData) {
                        const data = JSON.parse(cachedData)
                        this.processData(data)
                    } else {
                        const fixtures = [
                            {
                                id: 1,
                                title: 'Задача ',
                                description: 'Подробное описание задачи 1',
                                date: '12.06.2020',
                                completed: false
                            },
                            {
                                id: 2,
                                title: 'Задача 2',
                                description: 'Подробное описание задачи 2',
                                date: '14.05.2020',
                                completed: true
                            },
                            {
                                id: 3,
                                title: 'Задача 3',
                                description: 'Подробное описание задачи 3',
                                date: '25.01.2021',
                                completed: false
                            },
                            {
                                id: 4,
                                title: 'Задача 4',
                                description: 'Подробное описание задачи 4',
                                date: '18.03.2021',
                                completed: true
                            },
                            {
                                id: 5,
                                title: 'Задача 5',
                                description: 'Подробное описание задачи 5',
                                date: '11.08.2022',
                                completed: false
                            },
                            {
                                id: 6,
                                title: 'Задача 6',
                                description: 'Подробное описание задачи 6',
                                date: '31.01.2022',
                                completed: true
                            },
                        ];
                        this.processData(fixtures);
                    }
                });
        },
        processData(data) {
            this.allTask = data
            this.isVisible = true
        },
        getYear(item) {
            return item.date.split('.').splice(2, 1).join(' ')
        }

    }
}
