import React from 'react'
import { Optimus } from '@components'
import './index.scss'
import { Button, Input } from 'antd'

export const Save = (({history})=>{
    // 回到上一页
    function goBack(){
        history.goBack()
    }
    return <Optimus>
        <div className='save'>
            <div className='save-content'>
                <div className='save-form'>
                    <div className='save-input'>
                        <span>Name</span><span>*</span> <Input maxLength='40' />
                        <div className='save-warning'>
                            <span>Please fill in the Name.</span>
                        </div>
                    </div>
                    <div className='save-showboard'>
                        <div className="row">
                            <span className='save-label'>Data Center:</span>
                            <span>HZZZ-VIM7-1</span>
                        </div>
                        <div className="row">
                            <span className='save-label'>CEE version:</span>
                            <span>Drop26</span>
                        </div>
                        <div className="row">
                            <span className='save-label'>Host:</span>
                            <span>100</span>
                        </div>
                        <div className="row">
                            <span className='save-label'>Data loaded at:</span>
                            <span>2020-07-09 14:22:03</span>
                        </div>
                    </div>
                </div>
                <div className='save-btn-grp'>
                    <Button className='diy_dark_blue' type='primary' onClick={goBack}>OK</Button>
                    <Button className='diy_light_blue' type='primary' onClick={goBack}>Cancel</Button>
                </div>
            </div>
        </div>
    </Optimus>
})

