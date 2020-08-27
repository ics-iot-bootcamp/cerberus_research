import React from 'react'
//
const SideBarTitle = ({title}) => (
    <div class="sidebar-header" style={({padding:'0px'})}>
        <img class="mx-auto d-block" style={({width:'100%',marginBottom:'0px', marginTop:'10px'})} src="/img/logo.png" />
        <h3 class="text-center disable-select" style={({marginBottom:'0px'})}>{title}</h3>{/** Можно сделать marginBottom: 0px для того, чтобы меньше отступ был */}
    </div>
);

export default SideBarTitle;