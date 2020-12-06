import React, { useState } from 'react';

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
        console.log(form.colorHex);
        if (form.colorHex.match(/^[A-Fa-f0-9]{6}$/)) {}
    };

    const handleColorChange = (params) => {
        const value = params.target.value;
        const colorHex = value.slice(1);//убираем #
        if (colorHex.match(/^[A-Fa-f0-9]{6}$/)) { //проверяем валидность вводимого значения
            const newR = parseInt(colorHex.slice(0, 2), 16);//вычленяем часть символов для конвертации в 10-тиричную систему
            const newG = parseInt(colorHex.slice(2, 4), 16);//вычленяем часть символов для конвертации в 10-тиричную систему
            const newB = parseInt(colorHex.slice(4, 6), 16);//вычленяем часть символов для конвертации в 10-тиричную систему
            //получаем новое значение стейта
            setColor((prevForm) => {return {...prevForm, colorHex: colorHex, r: newR, g: newG, b: newB, error: false}});
        } else {
            console.log('not ok');//введённое значение не валидно
            setColor((prevForm) => {return {...prevForm, error: true}});
        }
    }
        
    return (
        <div className='container' style={{backgroundColor: `rgb(${form.r}, ${form.g}, ${form.b})`}}>
            <div className='container-form'>
                <form className='form' onSubmit={handleSubmit}>
                    <input id="color" name="color" value={ form.sharp + form.colorHex } onChange={handleColorChange}/>
                </form>
            </div>
            <div className='msg'>{form.error ? 'Ошибка!' : `rgb(${form.r}, ${form.g}, ${form.b})`}</div>
        </div>
    )
};
