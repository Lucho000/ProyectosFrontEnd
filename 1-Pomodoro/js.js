window.onload = () => {
    //CLOCK
    let clockMinutes;
    let clockSeconds;

    function updateClock() {
        clockMinutes = formatNumbers(currentTime);
        clockSeconds = formatNumbers(seconds);
        clock.innerHTML = clockMinutes + ":" + clockSeconds;
    }
    function formatNumbers(time) {
        let formattedDigits;
        if(time < 10){
            formattedDigits = "0" + time;
        }
        else{
            formattedDigits = time;
        }
        return formattedDigits;
    }
    /*FRONTEND CONECTION*/
    let clock = document.getElementById("clock");
    let cyclesInput = document.getElementById("cycles-input");
    let startButton = document.getElementById("start-button");
    let workTimeInput = document.getElementById("work-time");
    let breakTimeInput = document.getElementById("break-time");
    let restTimeInput = document.getElementById("rest-time");
    
    function startPomodoro() {
        console.log("Started pomodoro");
        pomodoroController();
    }
    function populateVariables() {
        console.log("Populated variables");
        workTime = workTimeInput.value;//Minutos
        breakTime = breakTimeInput.value;//Minutos
        restTime = restTimeInput.value;//Minutos
        cyclesGoal = cyclesInput.value;
        timesCompleted = 0;
    }

    startButton.onclick = () => {
        populateVariables();
        startPomodoro();
        startButton.disabled = true;
    }
    /*POMODORO*/
    let workTime;
    let breakTime;
    let restTime;
    let timesCompleted;//Cuántos tiempos completamos
    let cyclesGoal;
    let cyclesCompleted = 0;

    function pomodoroController() {
        if(isRestTime()){
            cyclesCompleted++;
            if(!goalReached()){
                currentTime = restTime;
                timer();
                timesCompleted = 0;
            }
            else{
                console.log("¡Pomodoro finished!");
            }
            return;
        }
        if(timesCompleted % 2 == 0){
            currentTime = workTime;
            timesCompleted++;
            timer();
            console.log("Time to work: TC" + timesCompleted);
        }
        else{
            currentTime = breakTime;
            timesCompleted++;
            timer();
            console.log("Time to break: TC" + timesCompleted);
        }
    }

    function isRestTime() {
        return timesCompleted == 7;
    }

    function goalReached() {
        return cyclesGoal == cyclesCompleted;
    }
    /*TIMER*/
    let currentTime;//Minutos seteados
    let seconds = 0;

    function timer() {
        if(currentTime > 0 || seconds > 0){
            if(seconds == 0){
                seconds = 59;
                currentTime--;
            }
            else{
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            interval = setTimeout(timer, 1000);
        }
        else{
            pomodoroController();
            console.log("El temporizador terminó");
        }
    }

    timer();
};