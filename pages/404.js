import styles from '../styles/Error.module.css'
import Link from 'next/link'

export default function Custom404() {
    return(

    <div className={styles.notfoundMain}>
		<div className={styles.notfound}>
			<div className={styles.notfound404}>
				<h1>404</h1>
			</div>
			<h2>Oops! This Page Could Not Be Found</h2>
			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
			<Link href="/">
                <a >Go To Homepage</a>
            </Link>
            
		</div>
	</div>
    );

  }