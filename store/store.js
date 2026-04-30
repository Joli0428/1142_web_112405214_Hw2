// src/store.js
import { create } from 'zustand';

let questionData = [
    {
      title:"敘述敘述敘述",
      options:[
        {
          text:"選項一",
          value:1
        },
        {
          text:"選項二",
          value:2
        },
        {
          text:"選項三",
          value:3
        },
      ]
    },
    {
      title:"敘述敘述敘述",
      options:[
        {
          text:"選項一",
          value:1
        },
        {
          text:"選項二",
          value:2
        },
        {
          text:"選項三",
          value:3
        },
      ]
    },
    {
      title:"敘述敘述敘述",
      options:[
        {
          text:"選項一",
          value:1
        },
        {
          text:"選項二",
          value:2
        },
        {
          text:"選項三",
          value:3
        },
      ]
    }
  ];

// 建立 store hook
const usePsyDataStore = create(
    (set) => ({
        questionIndex: 0,  
        totalValue:0 ,    
        questions: questionData 
    })
);


export { usePsyDataStore }