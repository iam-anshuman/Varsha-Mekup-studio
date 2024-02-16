export function useCreateCertificate() {

    async function createCertificate(formData){
        const token = localStorage.getItem("adminToken");
        if(!token){
            throw new Error("Unauthorized");
        }
        const bearer = "Bearer "+token;
        try {
            const response = await fetch("http://localhost:4000/admin/api/createpdf",{
                method:"POST",
                headers:{
                    "Authorization":bearer
                },
                body:formData
            });
            const res = await response.json();
            if(response.ok){
                return res;
            }
            else{
                throw new Error(res.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    return {createCertificate};
}