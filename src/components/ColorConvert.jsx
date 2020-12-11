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
        if (/^[A-Fa-f0-9]*$/.test(form.colorHex) && form.colorHex.length === 6) { //проверяем валидность введённого значения цвета
            setColor((prevForm) => {return {...prevForm, error: false, style: true}});  //включаем цвет
        } else {
            setColor((prevForm) => {return {...prevForm, error: true, style: false}}); //включаем ошибку
        };        
    };

    const handleColorChange = (params) => {
        const value = params.target.value;
        setColor((prevForm) => {return {...prevForm, error: false, style: false}}); //если была ошибка, то отключаем её
        if (value.length === 8) return null; //не даёмм ввесьти больше символов чем в можно для определния цвета
        const colorHex = value.slice(1);//убираем #
        // оператор || нужен чтобы не появлялось сообщение NaN в значении цвета
        const newR = parseInt(colorHex.slice(0, 2), 16) || '';//вычленяем часть символов для конвертации в 10-тиричную систему
        const newG = parseInt(colorHex.slice(2, 4), 16) || '';//вычленяем часть символов для конвертации в 10-тиричную систему
        const newB = parseInt(colorHex.slice(4, 6), 16) || '';//вычленяем часть символов для конвертации в 10-тиричную систему 
        setColor((prevForm) => {return {...prevForm, colorHex: colorHex, r: newR, g: newG, b: newB}}); 
    }
        
    return (
        <div className='container' style={ form.style ? {backgroundColor: `rgb(${form.r}, ${form.g}, ${form.b})`} : null}>
            <div className='container-form'>
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="color" className='label'>Press Enter</label>
                    <input id="color" name="color" value={ form.sharp + form.colorHex } onChange={handleColorChange}/>
                </form>
            </div>
            <div className='msg'>{form.error ? 'Ошибка!' : `rgb(${form.r}, ${form.g  || ' '}, ${form.b || ' '})`}</div>
        </div>
    )
};










/*
export default function ColorConvert(props) {
    const [form, setColor] = useState({
        sharp: '#',
        colorHex: '',
        r: '',
        g: '',
        b: '',
        error: false
    });

    const  handleSubmit = (params) => {
        params.preventDefault();
        const color = `${form.r}${form.g}${form.b}`; //собираем полученное значение цвета
        if (!(color.match(/^[A-Fa-f0-9]{6}/))) { //проверяем валидность введённого значения цвета
            setColor((prevForm) => {return {...prevForm, error: true}});
        }
    };

    const handleColorChange = (params) => {
        const value = params.target.value;
        if (value.length === 8) return null; //не даёмм ввесьти больше символов чем в можно для определния цвета
        const colorHex = value.slice(1);//убираем #
        const newR = parseInt(colorHex.slice(0, 2), 16);//вычленяем часть символов для конвертации в 10-тиричную систему
        const newG = parseInt(colorHex.slice(2, 4), 16);//вычленяем часть символов для конвертации в 10-тиричную систему
        const newB = parseInt(colorHex.slice(4, 6), 16);//вычленяем часть символов для конвертации в 10-тиричную систему
                //получаем новое значение стейта
        setColor((prevForm) => {return {...prevForm, colorHex: colorHex, r: newR, g: newG, b: newB, error: false}});
    }
        
    return (
        <div className='container' style={{backgroundColor: `rgb(${form.r}, ${form.g}, ${form.b})`}}>
            <div className='container-form'>
                <form className='form' onSubmit={handleSubmit}>
                    <input id="color" name="color" value={ form.sharp + form.colorHex } onChange={handleColorChange}/>
                </form>
            </div>
            <div className='msg'>{form.error ? 'Ошибка!' : `rgb(${form.r}, ${form.g  || ' '}, ${form.b || ' '})`}</div>
        </div>
    )
};

 */