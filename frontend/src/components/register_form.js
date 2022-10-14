import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA  from "react-google-recaptcha";

export const Registerform = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm(); 
    const captchaRef = useRef();
    const onSubmit = async (data, e) => {
        e.preventDefault();
        const token = await captchaRef.current.executeAsync();
        captchaRef.current.reset();
        // console.log(data);
        var csrftoken = getCookie('csrftoken');
        fetch(process.env.REACT_APP_BACKEND_URL+'/views/register_validate', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                token: token,
                data: data
            })
        })
        .then(resp=>{
            if (resp.status == 200) return resp.json();
            else throw new Error(resp);
        })
        .then(data=>{
            console.log(data);
        })
        .catch(error=>console.log(error));
        // console.log(data, e, "token: ", token);
        captchaRef.current.reset();

    };
    const onError = (errors, e) => console.log("Errores");

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

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
                <label htmlFor="floatingName">Nombre o Alias <span className="text-danger"> *</span></label>
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
            <div className="form-floating mb-3 col-4">
                <input name="password" type="password" className="form-control" id="floatingpassword" placeholder="Contraseña" {...register("password", {required: true })} aria-invalid={errors.password ? "true" : "false"} />
                {errors.password?.type === 'required' && <p className="text-danger" role="alert">Debes ingresar una contraseña</p>}
                <label htmlFor="floatingpassword">Contraseña <span className="text-danger"> *</span></label>
            </div>
            <div className="form-floating mb-3 col-4">
                <input name="password2" type="password" className="form-control" id="floatingpassword2" placeholder="Repite contraseña" {...register("password2", 
                {
                required: true, 
                validate: {matchPassword: v=> {
                    const {password} = getValues();
                    return password==v;
                }}}
                )} 
                aria-invalid={errors.password2 ? "true" : "false"} 
                />
                {errors.password2?.type === 'required' && <p className="text-danger" role="alert">Debes repetir la contraseña</p>}
                {errors.password2?.type === 'matchPassword' && <p className="text-danger" role="alert">Las contraseñas deben coincidir</p>}
                <label htmlFor="floatingpassword2">Repite contraseña <span className="text-danger"> *</span></label>
            </div>

            <div className="w-100"></div>
            <div className="form-floating col-8">
                <input type="text" className="form-control" id="floatingTextarea" placeholder="Address" {...register("address")} />
                <label htmlFor="floatingTextarea">Dirección</label>
            </div>
            <div className="w-100"></div>
            <div className="col-md-4 col-auto mt-3">
            <ReCAPTCHA 
            size="invisible"
            sitekey={process.env.REACT_APP_SITE_KEY}
            ref={captchaRef}
            />

            </div>
            <div className="w-100"></div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mt-3" id="liveAlertBtn">Registarse</button>
            </div>
        </form>
    );
};