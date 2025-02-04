'use client'
import styles from './LandingPage.module.scss'
import Links from '~/Links'
import SlidingSection from '~/SlidingSection'

export default function Home() {
  
  // const {breakpoint} = useContext(siteContext)
  return (<>
              <SlidingSection>
                <header className={styles['sys-vis']}>
                  <div className={styles.first}>
                    <h1>Our Systems, Your Visions</h1>
                  </div>  
                </header>
              </SlidingSection>
              <SlidingSection left>
                <div className={styles['main-section']}>
                  <div className={styles['let-us']}>
                    <h5>When you’re bringing your ideas to life,</h5>
                    <h5>there can be a lot to worry about.</h5>
                    <br/>
                    <h5>Let us make sure one thing always goes right.</h5>
                    <h2>Never worry<br/>about your website</h2>
                  </div>
                </div>
              </SlidingSection>
              <SlidingSection><Links /></SlidingSection>
              <SlidingSection left>
                <h2>What we Do</h2>
                <p>
                  Here at SysVisionz, we believe that your website should be the least of your worries, and every team deserves to have the tools to realize their maximum potential. 
                  We are dedicated to providing custom tailored software development for your business, as well as 
                  providing guidance on how your team can onboard, mentor, and improve your own developers, settng you up for success now and in the future.
                </p>
                <p>
                  Our goal is your goal; to make your business thrive in the rapidly shifting, unpredictable tech landscape.
                  Our experienced team of developers work closely with you to build, refine, or refactor your application.
                </p>
                <p>
                  If you have a team already, we work closely with your developers to help them revitalize their innovative spirit
                  giving them the tools and ways of working that will provide your business with the edge it needs to stay on top,
                  no matter what the future throws at you.
                </p>
              </SlidingSection>
              <SlidingSection>
                <h2>How we Work</h2>
                <p>
                  Our applications are built with the latest technologies, providing the performance and security you expect and deserve from your software.
                </p>
                <p>
                  Whether your application is internal or customer facing, we work with you to ensure that it not only meets your specifications, but provides a future-proof, scalable and maintainable solution that will keep you prepared to meet all your business needs.
                </p>
                <p>
                  Not only that, but our team has proven experience meeting security and compliance requirements for even HIPAA level data sensitivity
                </p>
              </SlidingSection>
              <SlidingSection left>
                <h2>Why SysVisionz?</h2>
                <p>
                  When you choose us, you can be assured that your applications will be delivered with the care and attention to detail you have always wanted from your contractors.
                </p>
                <p>
                  With extensive experience in the industry, we know what works and what doesn&apos;t, and have the experience to know the right questions to ask to ensure you get what you want the first time.
                </p>
                <p>
                  After all, we know that your time is valuable, and we want to make sure that you can focus on what you do best, while we take care of the software development that makes your business not just survive, but thrive.
                </p>
              </SlidingSection>
              <SlidingSection><h3>
                So why wait?<br/> 
                Let&apos;s get to work.<br/>
                Let our Systems build your Visions today.
              </h3>
              <Links /></SlidingSection>
            </>
  );
}
