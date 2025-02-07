function submitForm(event){
    event.preventDefault()
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let subject = document.getElementById("subject").value
    let skill = document.getElementById("skill").value
    let messege = document.getElementById("messege").value
  
    // alert(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nSkill: ${skill}\nMessege: ${messege}`) 
    
    let emailTo= 'jayasaleh06@gmail.com'
    let a = document.createElement("a")
    a.href = `mailto:${emailTo}?subject=${subject}&body=${`Halo perkenalkan nama saya ${name} Silakan Hubungi saya di ${email} Berikut hal yang ingin saya sampaikan : ${messege} berikut adalah skill yang saya kuasai : ${skill} `}`

    a.click()
}