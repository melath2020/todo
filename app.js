var form= document.querySelector('#todo-form');
var todoSection=document.querySelector('.todo-items')
var todos=[];


form.addEventListener('submit',function(e){
    e.preventDefault();
    let todo_value=form.todo_text.value;
    form.todo_text.value='';
    let obj ={
        item : todo_value,isCompleted:false
    };
    todos.push(obj);
    addNewtodo(obj)
})

function addNewtodo(val){

        let item=document.createElement('div');
        let paragraph=document.createElement('p');
        let deleteButton=document.createElement('button');

        paragraph.innerHTML=val.item;
        deleteButton.innerHTML='<i class="fa-solid fa-xmark"></i>'

        item.classList.add('item');
        if(val.isCompleted===true){
            item.classList.add('completed');
        }
        deleteButton.classList.add('my-btn','delete');

        item.appendChild(paragraph);
        item.appendChild(deleteButton);

        todoSection.appendChild(item);

        //delete
deleteButton.addEventListener('click',function(e){
    let confirmValue=confirm('are you sure to delete')
    if(confirmValue){
        item.remove();
        for(let i=0;i<todos.length;i++){
            if(todos[i].item===val.item){
                todos.splice(i,1);
                updateLocalStorage();
                console.log(todos)
                break;
            }
        }
    }
})
paragraph.addEventListener('click',function(e){
   if(item.classList.contains('completed')){
    item.classList.remove('completed');
    for(let i=0;i<todos.length;i++){
        if(todos[i].item===val.item){
            todos[i].isCompleted=false;
            updateLocalStorage();
            console.log(todos)
            break;
        }
    }
    

   }else{
    item.classList.add('completed')
    for(let i=0;i<todos.length;i++){
        if(todos[i].item===val.item){
            todos[i].isCompleted=true;
            updateLocalStorage();
            console.log(todos)
            break;
        }
    }
   }
})
updateLocalStorage()

}

function updateLocalStorage(){
    localStorage.setItem('todo',JSON.stringify(todos))
}

function autoLoadFromLocalStorage(){
    let values=localStorage.getItem('todo');
    if(values){
        let parsedValue =JSON.parse(values);
        todos=parsedValue;
        for(let i=0;i<todos.length;i++){
           addNewtodo(todos[i]);
        }
    }
}

autoLoadFromLocalStorage()