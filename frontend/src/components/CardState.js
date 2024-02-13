import {atom} from 'recoil'

export const CardState=atom({
    key:"CardState",
    default:[
        {
        id:1,
        title:"your title",
        description:"your description"
    }
]
})