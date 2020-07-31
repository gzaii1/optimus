import React from 'react'
import { Slide, Typography } from '@material-ui/core'
import { MediaControlCard } from '@components'
import bg1 from '../../assets/images/bg1.jpg'
import bg2 from '../../assets/images/bg2.jpg'
import bg3 from '../../assets/images/bg3.jpg'
import './index.scss'

/* 登录首页 */
export const ToolSelection = (({history})=> 
     <div className='ToolSelection'>
            <Slide direction='right' in={true}>
            <div className='select'>
                <div className='select-title'>
                  <div className='select-bg'>
                    <Typography component="h4" variant="h4"> Tool Selection</Typography>
                    <span>Here you can choose the tool you need.</span>
                  </div>
                </div>
                <div className='select-box'>
                    <MediaControlCard title='YamlGenerator' func={()=>history.push('YamlGenerator')} image={bg2} />
                    <MediaControlCard title='Ericic' func={()=>history.push('Ericic')} image={bg3} />
                    <MediaControlCard title='Item1' func={()=>history.push('ToolSelection')} image={bg1} />
                    <MediaControlCard title='Item2' func={()=>history.push('ToolSelection')} image={bg1} />
                </div>
            </div>     
        </Slide>
    </div>)