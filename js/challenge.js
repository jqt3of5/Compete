window.onload = function() {
    var backdrop = document.getElementById('dialog-backdrop')
    var dialog = document.getElementById('team-dialog')
    backdrop.style.display = 'none'
    if (dialog.getAttribute('open') != undefined)
    {
        backdrop.style.display = 'block'
    }

    var teamLabel = document.getElementById('current-team')

    teamLabel.onclick = function(e) {
        dialog.setAttribute("open","")
        backdrop.style.display = 'block'
    }

    var submit = document.getElementById('team-select-form')
    submit.onsubmit = function(e)
    {
        e.preventDefault()

        var teams = document.getElementById('available-teams')
        var team = teams.options[teams.selectedIndex]
        teamLabel.innerHTML = team.text

        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              dialog.removeAttribute('open')
              backdrop.style.display = 'none'        
            }
          };
          xhttp.open("POST", "/team/" + team.value, true);
          xhttp.send();
    }

    var submit = document.getElementById('answer-form')
    submit.onsubmit = function(e)
    {
      e.preventDefault()
      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              
                var question_section = document.getElementById('question-section')
                question_section.style.transition = 'none'
                if (this.response == 'true')
                {
                    
                    question_section.classList.add("challenge-solved")
                }
                else
                {
                    question_section.classList.add("challenge-wrong")
                    //Need to do this to force the browser to execute the code? Weird, but whaterver
                    question_section.offsetHeight
                    question_section.style.transition = ''
                    question_section.classList.remove("challenge-wrong")
                }
            }
          };

          xhttp.open("POST", "", true);
          xhttp.setRequestHeader("Content-Type", "application/json");
          var answer = document.getElementById('answer').value
          xhttp.send(JSON.stringify({answer:answer}));
    };

}