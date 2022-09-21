

var courseApi = 'http://localhost:3000/courses';

function start(){
    
    getCourses(renderCourses);
   
    handleCreateForm();
    
}

start();


function getCourses(cb){
    fetch(courseApi)
        .then(function(response){
            
            return response.json();
        })
        .then(cb)
        .catch(function(err){
            console.log(err);
        });
}

function createCourse(data,cb){
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'            
          },
        body: JSON.stringify(data)
    };
    fetch(courseApi,option)
        .then(function(response){
            response.json();
        })
        .then(cb)
}

function updateCourse(id,data,cb){

    swapButton();

    var option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'            
          },
        body: JSON.stringify(data)
    };
    fetch(courseApi+'/'+id,option)
        .then(function(response){
            //console.log('edit');
            response.json();
        })
        .then(cb)
        .catch(function(err){
            console.log(err);
        });
}

function swapButton(){
    var button = document.querySelector('.button').id;
    if (button === 'edit'){
        var type = document.querySelector('#edit');    
        type.innerText = "Create";
        type.id = "create";
    } else {
        var type = document.querySelector('#create');    
        type.innerText = "Edit";
        type.id = "edit";
    }


}

function renderCourses(courses){
    var listCourses = document.querySelector('#list-courses');
    var htmls = courses.map(function(course){
        return `
        <li class="course-item-${course.id}">
        <h4> ${course.name} </h4>
        <p> ${course.description} </p>
        <button onclick="handleDeleteCourse(${course.id})">Delete</button>
        <button onclick="handleUpdateCourse(${course.id})">Edit</button>
        </li>
        `;
    });    
    listCourses.innerHTML= htmls.join('');
}

function handleUpdateCourse(id){

    var listCourses = document.querySelector('.course-item-'+id);
    var nameTag = listCourses.querySelector('h4').innerText;
    var descriptionTag = listCourses.querySelector('p').innerText;

    document.querySelector('input[name="name"]').value = nameTag;
    document.querySelector('input[name="description"]').value = descriptionTag;

    swapButton();
    var editButton = document.querySelector('#edit');

    editButton.onclick = function(){
       // console.log('edit');
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        };
        //console.log(formData);

        updateCourse(id,formData,function(){
            //getCourses(renderCourses);
            start();
        });
    }
    
    //console.log( nameTag); 
}

function handleDeleteCourse(data){
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'            
          }
        
    };

    fetch(courseApi+"/"+data,option)
        .then(function(response){
            response.json();
        })
        .then(function(){
            var courseItem = document.querySelector('.course-item-'+data);
            if (courseItem){
                console.log('run');
                courseItem.remove();
            }
        })
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var formData = {
            name: name,
            description: description
        };
        //console.log(formData);

        createCourse(formData,function(){
            document.querySelector('input[name="name"]').value='';
            document.querySelector('input[name="description"]').value='';
            getCourses(renderCourses);
        });
    }
}