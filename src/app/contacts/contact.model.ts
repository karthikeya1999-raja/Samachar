export class Contact{

    name : string;
    email : string;
    phone : string;
    imagePath : string;
    gender : string;
     
    constructor(name: string, phone: string, gender : string,email?: string, imagePath? : string) {

        this.name = name;
        this.phone = phone;
        if(gender == "Male"||gender == "MALE"||gender == "male")
        {
            this.gender = "Male";
        }
        else if(gender == "Female"||gender == "female"||gender == "FEMALE"||gender == "FeMale")
        {
            console.log("Entered if of female");
            this.gender = "Female";
        }
        if(email){
            this.email = email;
        }
        else{
            this.email = "";
        }
        if(imagePath.length > 0){
            this.imagePath = imagePath;
        }
        else{
            if(this.gender === "Male")
            {
                this.imagePath = "https://www.w3schools.com/bootstrap4/img_avatar3.png";
            }
            else if(this.gender === "Female")
            {
                this.imagePath = "https://www.w3schools.com/bootstrap/img_avatar4.png";
            }
            else
            {
                this.imagePath = "https://www.w3schools.com/bootstrap4/img_avatar3.png";
            }
        }
    }
}