import React, { useState } from 'react';

export default function ColorConvert(props) {
    const [form, setColor] = useState({
        sharp: '#',
        colorHex: '',
        r: '',
        g: '',
        b: '',
        error: false, //для включения ошибки
        style: false //для включения цвета
    });
    
    const  handleSubmit = (params) => {
        params.preventDefault();
        /*данный блок кода нужен для конвертации путём нажатия клавиши Enter
        также в строках 39 и 41 в сравнениях надо прописать не  colorHex, а form.colorHex 
        if (/^[A-Fa-f0-9]*$/.test(form.colorHex) && form.colorHex.length === 6) { //проверяем валидность введённого значения цвета
            setColor((prevForm) => {return {...prevForm, error: false, style: true}});  //включаем цвет
        } else {
            setColor((prevForm) => {return {...prevForm, error: true, style: false}}); //включаем ошибку
        };
        */     
    };

    const handleColorChange = (params) => {
        const value = params.target.value;
        console.log(value);
        setColor((prevForm) => {return {...prevForm, error: false, style: false}}); //если была ошибка, то отключаем её
        const colorHex = value.slice(1);//убираем #
        if (colorHex.length > 6) {
            setColor((prevForm) => {return {...prevForm, error: true, style: false}}); //включаем ошибку
        }
        // оператор || нужен чтобы не появлялось сообщение NaN в значении цвета
        const newR = parseInt(colorHex.slice(0, 2), 16) || '';//вычленяем часть символов для конвертации в 10-тиричную систему
        const newG = parseInt(colorHex.slice(2, 4), 16) || '';//вычленяем часть символов для конвертации в 10-тиричную систему
        const newB = parseInt(colorHex.slice(4, 6), 16) || '';//вычленяем часть символов для конвертации в 10-тиричную систему 
        setColor((prevForm) => {return {...prevForm, colorHex: colorHex, r: newR, g: newG, b: newB}});
        if (/^[A-Fa-f0-9]*$/.test(colorHex) && colorHex.length === 6) { //проверяем валидность введённого значения цвета
            setColor((prevForm) => {return {...prevForm, error: false, style: true}});  //включаем цвет
        } else if (colorHex.length === 6) {
            setColor((prevForm) => {return {...prevForm, error: true, style: false}}); //включаем ошибку
        };
    }
        
    return (
        <div className='container' style={ form.style ? {backgroundColor: `rgb(${form.r}, ${form.g}, ${form.b})`} : null}>
            <div className='container-form'>
                <form className='form' onSubmit={handleSubmit}>
                    {/*<label htmlFor="color" className='label'>Press Enter</label> для конвертации клавишей Enter*/}
                    <input id="color" name="color" value={ form.sharp + form.colorHex } onChange={handleColorChange}/>
                </form>
            </div>
            <div className='msg'>{form.error ? 'Ошибка!' : `rgb(${form.r}, ${form.g  || ' '}, ${form.b || ' '})`}</div>
        </div>
    )
};
