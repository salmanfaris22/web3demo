
import styles from './LanguageSelector.module.scss';

const languages = [
{name : "English"},
{name : "German"},
{name : "Spanish"},
{name : "Persian"},
{name : "Arabic"},
{name : "Chinese"},
{name : "Russian"},
{name : "Indonesian"}
]

const LanguageSelector = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>Languages:</li>
        {languages.map(({name})=>{
          return <li key={name} >{name}</li>
        })}
      </ul>
    </div>
  );
};

export default LanguageSelector;
