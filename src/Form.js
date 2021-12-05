// import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';   //используем все настройки и переименуем в Yup

//ВАРИАНТ С КОМПОНЕНТАМИ

const CompForm = () => {
    return (
        <Formik 
            initialValues={{        //initialValues - начальное значение(state); сюда также будут попадать внесенные польз., за этим следит handleChange и будут передавать в инпут
                name: '',
                email: '',
                amount: 0,
                currency: '',
                text: '',
                terms: false
            }}
            validationSchema={Yup.object({
                name: Yup.string()    //должен быть строкой
                        .min(2, 'Минимум 2 символа для заполнения')   //если меньше 2 символов, то только тогда выходит ошибка
                        .required('Обязательное поле!'),
                email: Yup.string()    
                        .email("Неправльный email адрес")
                        .required('Обязательное поле!'),
                amount: Yup.number()
                        .min(4, 'Не менее 4')                       
                        .required('Обязательное поле!'),
                currency: Yup.string().required('Обязательное поле!'),
                text: Yup.string()
                        .min(10, 'Не менее 10 символов' ),
                terms: Yup.boolean()
                    .required('Необходимо согласие!')
                    .oneOf([true], 'Необходимо согласие!')     //для checkbox применяется; если не true, то высветится ошибка
    
            })}
            onSubmit={values => console.log(JSON.stringify(values, null, 2))}
            //onSumbit -отравка данных, values -приходит объект с данными initialValues
            //(JSON.stringify(values, null, 2) - трансформирует объект в строку
            >  
          
            <Form className="form" >
                <h2>Отправить пожертвование</h2>
                <label htmlFor="name">Ваше имя</label>
                <Field
                    id="name"
                    name="name"
                    type="text"
                />
                <ErrorMessage className='error' name='name' component='div'/>
                
                <label htmlFor="email">Ваша почта</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage className='error' name='email' component='div'/>

                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className='error' name='amount' component='div'/>

                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as='select'
                    >

                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div'/>

                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as='textarea'
                />
                <ErrorMessage className='error' name='text' component='div'/>

                <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox"
                    />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className='error' name='terms' component='div'/>

                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}
export default CompForm;




// ВАРИАНТ С ХУКОМ useFormik

// //ЕСЛИ ЕСТЬ БИБЛ. Yup , ТО ТАКОЙ МЕТОД РУЧНОЙ ВАЛИДАЦИИ УЖЕ НЕ АКТНАЛЬНО
// // const validate = values => {                //values -приходит объект с данными initialValues
// //     const errors = {};

// //     if(!values.name){
// //         errors.name = "Обязательное поле!"
// //     }else if(values.name.length < 2){
// //         errors.name = "Минимум 2 символа для заполнения"
// //     }

// //     if(!values.email){
// //         errors.email = "Обязательное поле!"
// //     }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
// //         errors.email = "Неправльный email адрес"
// //     }

// //     return errors;
// // }

// const Form = () => {
//     const formik = useFormik({
//         initialValues: {        //initialValues - начальное значение(state); сюда также будут попадать внесенные польз., за этим следит handleChange и будут передавать в инпут
//             name: '',
//             email: '',
//             amount: 0,
//             currency: '',
//             text: '',
//             terms: false
//         }, 
//         // validate, //уже не актальна, т.к. есть Yup

//         validationSchema: Yup.object({
//             name: Yup.string()    //должен быть строкой
//                     .min(2, 'Минимум 2 символа для заполнения')   //если меньше 2 символов, то только тогда выходит ошибка
//                     .required('Обязательное поле!'),
//             email: Yup.string()    
//                     .email("Неправльный email адрес")
//                     .required('Обязательное поле!'),
//             amount: Yup.number()
//                     .min(4, 'Не менее 4')                       
//                     .required('Обязательное поле!'),
//             currency: Yup.string().required('Обязательное поле!'),
//             text: Yup.string()
//                     .min(10, 'Не менее 10 символов' ),
//             terms: Yup.boolean()
//                 .required('Необходимо согласие!')
//                 .oneOf([true], 'Необходимо согласие!')     //для checkbox применяется; если не true, то высветится ошибка

//         }),

//         onSubmit: values => console.log(JSON.stringify(values, null, 2))
//          //onSumbit -отравка данных, values -приходит объект с данными initialValues
//          //(JSON.stringify(values, null, 2) - трансформирует объект в строку
//     })
    
//     return (
//         <form className="form" onSubmit={formik.handleSubmit}>
//             <h2>Отправить пожертвование</h2>
//             <label htmlFor="name">Ваше имя</label>
//             <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formik.values.name}      //получает данные из initialValues
//                 onChange={formik.handleChange}   //handleChange - у useFormik есть этот метод, ктр передает данные value в initialValues, а оттуда попадают обратно сюда
//                 onBlur={formik.handleBlur}      //польз. взаимодействовал с input; touched - метод по запоминанию прикосновений польз.
            
//                 //errors - объект useFormik, куда попадают ошибки, если не соответсвуют валидации
//             />
//             {formik.errors.name && formik.touched.name ? <div className='error'>{formik.errors.name}</div> : null} 
            
//             <label htmlFor="email">Ваша почта</label>
//             <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formik.values.email}     
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur} 
//             />
//             {formik.errors.email && formik.touched.email ? <div className='error'>{formik.errors.email}</div> : null}

//             <label htmlFor="amount">Количество</label>
//             <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 value={formik.values.amount}     
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur} 
//             />
//             {formik.errors.amount && formik.touched.amount ? <div className='error'>{formik.errors.amount}</div> : null}

//             <label htmlFor="currency">Валюта</label>
//             <select
//                 id="currency"
//                 name="currency"
//                 value={formik.values.currency}     
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur} >

//                     <option value="">Выберите валюту</option>
//                     <option value="USD">USD</option>
//                     <option value="UAH">UAH</option>
//                     <option value="RUB">RUB</option>
//             </select>
//             {formik.errors.currency && formik.touched.currency ? <div className='error'>{formik.errors.currency}</div> : null}

//             <label htmlFor="text">Ваше сообщение</label>
//             <textarea 
//                 id="text"
//                 name="text"
//                 value={formik.values.text}     
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur} 
//             />
//             {formik.errors.text && formik.touched.text ? <div className='error'>{formik.errors.text}</div> : null}

//             <label className="checkbox">
//                 <input 
//                     name="terms" 
//                     type="checkbox"
//                     value={formik.values.terms}     
//                     onChange={formik.handleChange} 
//                     onBlur={formik.handleBlur} />
//                 Соглашаетесь с политикой конфиденциальности?
//             </label>
//             {formik.errors.terms && formik.touched.terms ? <div className='error'>{formik.errors.terms}</div> : null}

//             <button type="submit">Отправить</button>
//         </form>
//     )
// }

// export default Form;