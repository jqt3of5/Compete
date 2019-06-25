window.onload = function() {
    var backdrop = document.getElementById('dialog-backdrop')
    var dialog = document.getElementById('team-dialog')
    backdrop.style.display = 'none'
    if (dialog.className != 'selected')
    {
        dialog.setAttribute("open","")
        backdrop.style.display = 'block'
    }

    var submit = document.getElementById('dialog-submit')
    submit.onclick = function(e)
    {
        //Ajax to endpoint. Submit team id
        dialog.removeAttribute('open')
        backdrop.style.display = 'none'
    }

    var submit = document.getElementById('submit-answer')
    submit.onclick = function(e)
    {

      
    }

}