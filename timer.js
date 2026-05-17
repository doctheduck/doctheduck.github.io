let timers = document.getElementsByClassName("count");
let timerInterval;

function startTimer()
{
    if (!localStorage.getItem("timer_deadline"))
    {
        const deadline = Date.now() + (30 * 1000);
        localStorage.setItem("timer_deadline", deadline);
        localStorage.setItem("gameState", "0");
    }
    updateDisplay();
}
function renderTimer()
{
    if(localStorage.getItem("gameState") =="2")
    {
        clearInterval(timerInterval);
        for(let timer of timers)
        {
            timer.textContent = "YOU WIN!";
        }
        return;
    }
    const deadline = parseInt(localStorage.getItem("timer_deadline"));
    if (!deadline) {
        for (let timer of timers)
        {
            timer.textContent = "No Timer";
        }
        return;
    }

    const remaining = Math.max(0, Math.floor((deadline - Date.now()) / 1000));

    if (remaining <= 0)
    {
        for (let timer of timers)
        {
            timer.textContent = "Over";
            clearInterval(timerInterval);
            localStorage.removeItem("timer_deadline");
            if(!window.location.pathname.includes("index.html"))
            {
                window.location.href = "index.html";
            }
        }
    }
    else
    {
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        for(let timer of timers)
        {
            timer.textContent =`${mins}:${secs.toString().padStart(2, '0')}`;
        }
    }
}
function updateDisplay()
{

    clearInterval(timerInterval);
    renderTimer();
    timerInterval = setInterval(renderTimer, 1000);
}

window.onload = startTimer;
window.reset = function()
{
    clearInterval(timerInterval);

    localStorage.clear();

    localStorage.setItem("hasReset", "true");

    location.reload();
}

