async function handleFormSubmit(event){
    event.preventDefault();
    const expenseDetails = {
        expenseamount:event.target.expenseamount.value,
        description:event.target.description.value,
        category:event.target.category.value
    }
    try{
        const token=localStorage.getItem('token')
        const response = await axios.post(`http://localhost:3000/expense/postexpense`,expenseDetails,{headers:{"Authorization":token}})
        display(response.data);
        event.target.reset();
    }catch(error) {
        console.log(error)
    }
}
document.addEventListener('DOMContentLoaded',async ()=>{
    const token=localStorage.getItem('token')
    try {
        const response=await axios.get(`http://localhost:3000/expense/getexpense`,{headers:{"Authorization":token}})
        response.data.forEach(result => {
            display(result)
        });
    } catch (error) {
        console.log(error)
    }
})
function display(data) {
    const ul=document.querySelector('ul')
    const li= document.createElement('li')
    li.appendChild(document.createTextNode(
        `${data.expenseamount} - ${data.description} - ${data.category} `
    ))

    const deleteBtn=document.createElement('button')
    deleteBtn.appendChild(document.createTextNode('DELETE'));
    deleteBtn.setAttribute('id', data.id)
    li.appendChild(deleteBtn)

    ul.appendChild(li)

    deleteBtn.addEventListener('click', () => {
        const token=localStorage.getItem('token')
        const id = deleteBtn.getAttribute("id");
        axios.delete(`http://localhost:3000/expense/deleteexpense/${id}`,{headers:{"Authorization":token}})
        .then(res => {
            ul.removeChild(li)
        })
        .catch((error) => {
            console.log(error)
        })

    });

}