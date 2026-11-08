import styles from './Footer.module.css'

// import { FaYoutube } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { IoLogoGithub } from 'react-icons/io'

import IconLink from '@/components/common/IconLink'

/**
 * 푸터 컴포넌트
 * - Github/Email/Youtube 외부 링크 제공
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div className={`${styles.footerItem} ${styles.col}`}>
          <IconLink
            icon={<IoLogoGithub size={38} />}
            label='Github'
            url={'https://github.com/wndgur2'}
            className={styles.iconLink}
          />
          <div className={styles.seperator} />
          <small>Github</small>
          <small>@wndgur2</small>
        </div>
        <div className={`${styles.footerItem} ${styles.col}`}>
          <IconLink
            icon={<HiOutlineMail size={34} />}
            label='Email'
            url={'https://mail.google.com/mail/?view=cm&to=dkandjsl@gmail.com'}
            className={styles.iconLink}
          />
          <div className={styles.seperator} />
          <small>Email</small>
          <small>dkandjsl@gmail.com</small>
        </div>
        {/* <div className={`${styles.footerItem} ${styles.col}`}>
          <IconLink
            icon={<FaYoutube size={30} />}
            label='Youtube'
            url={'https://www.youtube.com/@junghyeok_lee6710'}
            className={styles.iconLink}
          />
          <div className={styles.seperator} />
          <small>Youtube</small>
          <small>@junghyeok_lee6710</small>
        </div> */}
      </div>
    </footer>
  )
}
