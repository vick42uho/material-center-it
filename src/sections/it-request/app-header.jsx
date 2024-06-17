import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TypeAnimation } from 'react-type-animation';

import "./app-header.css";


export default function AppHeaderRequest() {
    return (
        <div className='cardSection flex'>
            <div className='container flex'>
                <h1>
                    ศูนย์บริการโปรแกรม
                    <TypeAnimation
                        sequence={[' Center', 5000, 'ในโรงพยาบาลยันฮี', 5000]}
                        speed={50}
                        repeat={Infinity}
                    />

                </h1>
                <p>ระบบการจัดการที่สมบูรณ์แบบสำหรับโรงพยาบาลของคุณ</p>



                <div className='videoDiv'>
                    <video src="https://cdn.pixabay.com/video/2022/06/10/119850-719283268.mp4" autoPlay muted loop />
                </div>
            </div>
        </div>
    );
}
