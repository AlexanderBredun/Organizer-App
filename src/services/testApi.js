import { v4 as uuidv4 } from 'uuid';
import store from '@/store'

const fakeData = [
    {
        id: 1,
        name: 'jkjhkjhkhkhjk',
        img: '',
        organizer: 'name1',
        location: 'loc 1',
        date: new Date(1962, 6, 7),
        customHeading: 'Heading 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate earum facere\n' +
            '            molestiae officiis omnis voluptatem. Assumenda aut corporis, dignissimos dolore dolorem eaque ex minima\n' +
            '            necessitatibus nisi perspiciatis sint tempora!',
        programm: [
            {
                id: 1,
                icon: 'fa-calendar-times',
                title: 'default title 1',
                dateStart: new Date(),
                dateEnd: new Date(),
                reporter: 'name reporter 1',
                lang: 'RU',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias eius error et, quo\n' +
                    '                        recusandae temporibus ut! Aspernatur consequatur cupiditate eaque, enim ex hic nemo odit\n' +
                    '                        officiis reprehenderit sint ut veritatis.'
            },
            {
                id: 2,
                icon: 'fa-calendar-times',
                title: 'default title 1',
                dateStart: new Date(),
                dateEnd: new Date(),
            },
            {
                id: 3,
                icon: 'fa-calendar-times',
                title: 'default title 2',
                dateStart: new Date(),
                dateEnd: new Date(),

            }
        ]
    },
    {
        id: 2,
        name: 'Faket 2',
        img: '',
        organizer: 'name2',
        location: 'loc 2',
        date: new Date(2022, 6, 7),
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate earum facere\n' +
            '            molestiae officiis omnis voluptatem. Assumenda aut corporis, dignissimos dolore dolorem eaque ex minima\n' +
            '            necessitatibus nisi perspiciatis sint tempora!',
        programm: []
    },
    {
        id: 3,
        name: 'asdsadasdasd',
        img: '',
        organizer: 'name3',
        location: 'loc 3',
        date: new Date(1969, 6, 7),
        customHeading: 'Heading 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate earum facere\n' +
            '            molestiae officiis omnis voluptatem. Assumenda aut corporis, dignissimos dolore dolorem eaque ex minima\n' +
            '            necessitatibus nisi perspiciatis sint tempora!',
        programm: [
            {
                id: 1,
                icon: 'fa-calendar-times',
                title: 'default title 1',
                dateStart: new Date(),
                dateEnd: new Date(),

            },
            {
                id: 2,
                icon: 'fa-calendar-times',
                title: 'default title 2',
                dateStart: new Date(),
                dateEnd: new Date(),

            }
        ]
    }
]

export function fetchAllTestApi(){
   return new Promise(resolve => {
       setTimeout(()=> resolve(fakeData), 2000)
   })
}

export function fetchByIDTestApi(id){
    return new Promise(resolve => {
        setTimeout(()=> resolve(fakeData.filter(el => el.id === id)[0]), 2000)
    })
}

export function createEmptyEvent(){
    return {
        id: uuidv4(),
        name: '',
        img: null,
        organizer: store.state.auth.user.login || 'default',
        location: '',
        date: '',
        customHeading: '',
        description: '',
        programm: []
    }
}
export function createEmptyProgrammStep(){
    return {
        id: uuidv4(),
        icon: 'fa-key',
        title: 'Регистрация',
        customTitle: '',
        dateStart: '',
        dateEnd: '',
        description: '',
        reporter: '',
        themeReport: '',
        lang: '',
    }
}