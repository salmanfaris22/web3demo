import { shareToSocial } from '../../../utils/commonutils'
import styles from './SocialRow.module.scss'

const SocialRow = () => {
  return (
    <div className={styles.socialRow}>
        <div className={styles.socialIcon}  onClick={()=>{
            shareToSocial("x" , window.location.href)
        }}>
            <img alt='X'   src='/assets/images/socialShare/x.png'/>
        </div>
        <div className={styles.socialIcon} onClick={()=>{
            shareToSocial("fb" , window.location.href)
        }} >
            <img alt='Facebook'   src='/assets/images/socialShare/fb.png'/>
        </div>
        <div className={styles.socialIcon} onClick={()=>{
            shareToSocial("telegram" , window.location.href)
        }} >
            <img alt='Telegram'   src='/assets/images/socialShare/tele.png'/>
        </div>
        <div className={styles.socialIcon} onClick={()=>{
            shareToSocial("reddit" , window.location.href)
        }} >
            <img alt='Reddit'   src='/assets/images/socialShare/reddit.png'/>
        </div>
        {/* <div className={styles.socialIcon} onClick={()=>{
            shareToSocial("vk" , window.location.href)
        }} >
            <img alt='VKontakte'   src='/assets/images/socialShare/vkon.png'/>
        </div>
        <div className={styles.socialIcon} onClick={()=>{
            shareToSocial("weibo" , window.location.href)
        }} >
            <img alt='mc'   src='/assets/images/socialShare/mc.png'/>
        </div> */}
    </div>
  )
}

export default SocialRow