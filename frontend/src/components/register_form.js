import React from "react";
import { useForm } from "react-hook-form";

export const Registerform = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm(); 
    const onSubmit = data => console.log(data);

    const validateEmail = (email) =>{
        let count = 0;
        for (var i =0; i< email.length; i++){
            if (email[i] === "@") count++;
        }
        return count;
    };

    return (

        <form className="row justify-content-center py-3" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-floating mb-3 col-4">
                <input name="name" className="form-control" type="text" id="floatingName" placeholder="name" {...register("name")} />
                <label htmlFor="floatingName">Nombre</label>
            </div>
            <div className="form-floating mb-3 col-4">
                <input name="lastname" className="form-control" type="text" id="floatingLastname" placeholder="apellido" {...register("lastname")} />
                <label htmlFor="floatingLastname">Apellido</label>
            </div>
            <div className="w-100"></div>
            <div className="form-floating mb-3 col-4">
                <input name="email" type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" {...register('floatingEmail', { required: true, validate:{checkmail: v=> validateEmail(v) === 1 }})} aria-invalid={errors.floatingEmail ? "true" : "false"}/>
                {errors.floatingEmail?.type === 'required' && <p className="text-danger" role="alert">Email is required</p>}
                {errors.floatingEmail?.type === 'validate:checkemail' && <p className="text-danger" role="alert">Email is asdfasdfasdfds</p>}
                <label htmlFor="floatingEmail">Email <span className="text-danger"> *</span></label>
            </div>
            <div className="form-floating mb-3 col-4">
                <input name="subject" type="text" className="form-control" id="floatingSubject" placeholder="Phone number" {...register("phone", {valueAsNumber: true, required: true, validate:{checkLen: v=> v.length === 9 || 'Debes ingresar 9 digitos'} })} aria-invalid={errors.phone ? "true" : "false"} />
                {errors.phone?.type === 'required' && <p className="text-danger" role="alert">Phone is required</p>}
                <label htmlFor="floatingSubject">Telefono <span className="text-danger"> *</span></label>
            </div>
            <div className="w-100"></div>
            <div className="form-floating col-6">
                <input type="text" className="form-control" id="floatingTextarea" placeholder="Address" {...register("address")} />
                <label htmlFor="floatingTextarea">Dirección</label>
            </div>
            <div className="w-100"></div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mt-3" id="liveAlertBtn">Registarse</button>
            </div>
        </form>
    );
};