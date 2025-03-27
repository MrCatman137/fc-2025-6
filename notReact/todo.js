document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const pointsInput = document.getElementById("pointsInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const tasksContainer = document.getElementById("tasks");
    const completedCount = document.getElementById("completedCount");
    const totalCount = document.getElementById("totalCount");
    const progressBar = document.getElementById("progress");
    const userLevel = document.getElementById("userLevel");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let points = parseInt(localStorage.getItem("points")) || 0;

    function updateStats() {
        const completedTasks = tasks.filter(task => task.completed).length;
        completedCount.textContent = completedTasks;
        totalCount.textContent = tasks.length;
    
        let requiredPoints = 10; 
        let remainingPoints = 0;
        let level = 0;
        let points_now = points
        
        while (points_now >= requiredPoints) {
            level++;
            points_now -= requiredPoints;
            requiredPoints = Math.floor(requiredPoints * 1.2); 
        }
    
        remainingPoints = requiredPoints - points_now;
    
        const progressPercentage = ((requiredPoints - remainingPoints) / requiredPoints) * 100;
    
        progressBar.style.width = `${progressPercentage}%`;
    
        userLevel.textContent = level;
    }
    

    function renderTasks() {
        tasksContainer.innerHTML = "";

        if (tasks.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = "Додайте нову таску";
            emptyMessage.classList.add("empty-message");
            tasksContainer.appendChild(emptyMessage);
        } else {
            tasks.forEach((task, index) => {
                const li = document.createElement("li");

                const taskText = document.createElement("span");
                taskText.textContent = `${task.text} (${task.points} балів)`;

                if (task.completed) {
                    taskText.classList.add("completed");
                }

                const completeBtn = document.createElement("button");
                completeBtn.textContent = "✓";
                completeBtn.classList.add("complete-btn");
                completeBtn.onclick = () => completeTask(index, task.points);
                if (task.completed) {
                    completeBtn.classList.add("completed-btn");
                    completeBtn.disabled = true;
                    li.classList.add("completed");
                }

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "✗";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = () => deleteTask(index);

                const buttonContainer = document.createElement("div");
                buttonContainer.classList.add("task-buttons");
                buttonContainer.appendChild(completeBtn);
                buttonContainer.appendChild(deleteBtn);

                li.appendChild(taskText);
                li.appendChild(buttonContainer);
                tasksContainer.appendChild(li);
            });
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("points", points);
        updateStats();
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskPoints = parseInt(pointsInput.value);

        if (taskText === "") {
            return;
        }

        if (isNaN(taskPoints) || taskPoints < 1 || taskPoints > 100) {
            return;
        }

        tasks.push({ text: taskText, points: taskPoints, completed: false });
        taskInput.value = "";
        pointsInput.value = "";
        renderTasks();
    }

    function completeTask(index, taskPoints) {
        tasks[index].completed = true;
        points += taskPoints;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });
    pointsInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask();
    });

    renderTasks();
});
