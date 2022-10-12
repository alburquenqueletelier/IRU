import React from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA  from "react-google-recaptcha";

export const Registerform = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm(); 
    const onSubmit = (data, e) => console.log(data, e);
    const onError = (errors, e) => console.log("Errores");

    const validateAtSign = (email) =>{
        let count = 0;
        for (var i =0; i< email.length; i++){
            if (email[i] === "@") count++;
        }
        return count;
    };

    const validateMail = (email) => {
        let value = email.slice(email.indexOf('@'));
        if (email.length > 100) return false;
        if (value.length <= 2) return false;
        if (!value.includes(".")) return false;
        return true;
    };

    const validatePhone = (phone) => {
        if (isNaN(Number(phone))) return false;
        return true;
    };
    return (

        <form className="row justify-content-center py-3" onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="form-floating mb-3 col-4">
                <input name="name" className="form-control" type="text" id="floatingName" placeholder="name" {...register("name", {required: true})} />
                {errors.name?.type === 'required' && <p className="text-danger" role="alert">Ingresa tu nombre o un alias</p>}
                <label htmlFor="floatingName">Nombre <span className="text-danger"> *</span></label>
            </div>
            <div className="form-floating mb-3 col-4">
                <input name="lastname" className="form-control" type="text" id="floatingLastname" placeholder="apellido" {...register("lastname")} />
                <label htmlFor="floatingLastname">Apellido</label>
            </div>
            <div className="w-100"></div>
            <div className="form-floating mb-3 col-4">
                <input name="email" type="email" className="form-control" id="email" placeholder="name@example.com" {...register('email', { required: true, validate:{checkAtSign: v=> validateAtSign(v) === 1 , checkMail: v=> validateMail(v)}})} aria-invalid={errors.email ? "true" : "false"}/>
                {errors.email?.type === 'required' && <p className="text-danger" role="alert">Email es requerido</p>}
                {errors.email?.type === 'checkAtSign' && <p className="text-danger" role="alert">Email debe tener 1 solo &quot;@&quot;</p>}
                {errors.email?.type === 'checkMail' && <p className="text-danger" role="alert">Debe ser un email valido, ej: example@gmail.com</p>}
                <label htmlFor="email">Email <span className="text-danger"> *</span></label>
            </div>
            <div className="form-floating mb-3 col-4">
                <input name="subject" type="text" className="form-control" id="floatingSubject" placeholder="Phone number" {...register("phone", {required: true, validate:{checkIsNumber: v=> validatePhone(v), checkLen: v=> v.length === 9} })} aria-invalid={errors.phone ? "true" : "false"} />
                {errors.phone?.type === 'required' && <p className="text-danger" role="alert">Debes ingresar un número</p>}
                {errors.phone?.type === 'checkLen' && <p className="text-danger" role="alert">Debe tener 9 dígitos, ej: 987654321</p>}
                {errors.phone?.type === 'checkIsNumber' && <p className="text-danger" role="alert">Ingresa solo números, ej: 987654321</p>}
                <label htmlFor="floatingSubject">Telefono <span className="text-danger"> *</span></label>
            </div>
            <div className="w-100"></div>
            <div className="form-floating col-6">
                <input type="text" className="form-control" id="floatingTextarea" placeholder="Address" {...register("address")} />
                <label htmlFor="floatingTextarea">Dirección</label>
            </div>
            <div className="w-100"></div>
            <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY}/>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mt-3" id="liveAlertBtn">Registarse</button>
            </div>
        </form>
    );
};