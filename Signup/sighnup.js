async function sighnup(event){
    try {
        event.preventDefault()
        const sighnupDetails={
            name:event.target.name.value,
            email:event.target.email.value,
            password:event.target.password.value
        }
        const response=await axios.post("http://localhost:3000/user/signup",sighnupDetails)
        if(response.status===201){
            window.location.href="../Login/login.html"
        }
        else{
            throw new Error("Failed to login")
        }
        
    } catch (error) {
        document.body.innerHTML=`<div style="color:red;">${error} </div>`;
    }
   
}