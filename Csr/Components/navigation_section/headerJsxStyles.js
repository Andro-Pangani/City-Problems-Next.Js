export const navItemStyle = (active, lang) => (
 
 {
 fontSize: lang === 'Georgian' ? '1.5rem' : lang === 'Russian' ? '1.1rem' : '1.2rem',
 fontFamily: lang === 'English' ? 'alk-sanet' : null,
 ...active ? activeStyle : null
}

)

export const activeStyle = {
 background: "rgb(66 66 66)",
 color: "#cacaca",
 border: "1px solid #686309",
 borderRight: "none",
};