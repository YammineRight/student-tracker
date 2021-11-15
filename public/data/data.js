export const data = {
    

    semesters: [

        {
            id: 2,
            owner_id: 1,
            start_date: new Date('2021-09-01'),
            end_date: null,
        },

        {
            id: 1,
            owner_id: 1,
            start_date: new Date('2021-01-15'),
            end_date: new Date('2021-06-25'),
        }
    ],

    courses: [

        {
            id: 1,
            semester_id: 2,
            title: 'Web Development',
            credits: 4,
            professor: 'Youssef Bakouny',
            link: null,
        },

        {
            id: 2,
            semester_id: 2,
            title: 'Analyse de Projet',
            credits: 4,
            professor: 'Bernadette Wakim',
            link: null,
        },

        {
            id: 3,
            semester_id: 2,
            title: 'Communication Analogique et Numerique',
            credits: 6,
            professor: 'Hadi Sawaya',
            link: null,
        },

        {
            id: 4,
            semester_id: 1,
            title: 'Theorie du Signal',
            credits: 4,
            professor: 'Hadi Sawaya',
            link: null,
        },

        {
            id: 5,
            semester_id: 1,
            title: 'Bases de donnes relationnelles',
            credits: 4,
            professor: 'Jihad Renno',
            link: null,
        },

        {
            id: 6,
            semester_id: 1,
            title: 'Electronique Numerique',
            credits: 6,
            professor: 'Rayan Mina',
            link: null,
        }

    ],

    exams: [
        
        {
            id: 1,
            course_id: 3,
            type: 'partiel',
            date: new Date('2021-11-04'),
            grade: 67.5,
            description: 'chap 1 -> 6',
        },

        {
            id: 2,
            course_id: 1,
            type: '2eme Iteration',
            date: new Date('2021-11-16'),
            grade: null,
            description: 'Frontend',
        },

        {
            id: 3,
            course_id: 1,
            type: '1ere Iteration',
            date: new Date('2021-10-14'),
            grade: 80,
            description: null,
        },

        {
            id: 4,
            course_id: 2,
            type: 'Devoir',
            date: new Date('2021-10-22'),
            grade: 75,
            description: 'Base de donnees et use case',
        }
    ]
}