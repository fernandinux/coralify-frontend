import React, {useState, useEffect} from "react";
import styles from "../../styles/Webcertificate.module.css";
import { SiLinkedin } from "react-icons/si";
// import { Footer } from "../../components/common/Footer";

import { useRouter } from "next/router";
import { getFetch } from "../../client/client";

export default function WebCertificate() {
  const path = {
    logo: "/images/LogoCodeable.svg",
    download: "/images/icondownload.svg",
    share: "/images/iconshare.svg",
    instagram: "/images/iconinstagram.svg",
    whatsapp: "/images/iconwhatsapp.svg",
    facebook: "/images/iconface.svg",
    youtube: "/images/iconyoutube.svg",
    linkedin: "/images/iconlinkedin.svg",
    certificate: "/images/certificateFer.png",
  };

  const [certificateInfo, setCertificateInfo] = useState()
  const [isCertificate, setIsCertificate] = useState(false);
  const [bootcamper, setBootcamper] = useState();
  const [isBootcamper, setIsBootcamper] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCertificateInfo = async () => {
      const res = await getFetch(`/credentials/code/${router.query.code}`);
      if (!res.data.errors) {
        setCertificateInfo(res.data);
        const resUser = await getFetch(`/users/${res.data.credential.user_id}`);
        if(resUser.data != null){
          setIsCertificate(true);
          setBootcamper({name: resUser.data.name, last_name: resUser.data.last_name});
          setIsBootcamper(true);
        }else setIsBootcamper(false);
      } else setIsCertificate(false);
    };
    if (router.query.code) {
      getCertificateInfo();
    }
  }, [router]);

  return (
    <>
    {isCertificate && isBootcamper && (
    <div className={styles.container}>
      {/* <div className={styles.preview}></div>
      <div className={styles.success}></div> */}
      <div className={styles.backgroundcertificate}>
        <img src={certificateInfo.pdf} className={styles.certificate} />
      </div>
      <div className={styles.content}>
        <div className={styles.privatebuttons}>
          <h2 className={styles.idcertificate}>ID certificado: {certificateInfo.credential.code}</h2>
          <div className={styles.privatebuttonslinkedin}>
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=https://coralify.com/certificado/fernando-daniel-pareja-cardenas//&title=Coralify&summary=WIAD2020_LIMA"
              className={styles.publicbuttonblue}
            >
              Compartir en <SiLinkedin className={styles.SiLinkedin} />
            </a>
            <a href="" className={styles.publicbuttonwhite}>
              Agregar a <SiLinkedin className={styles.SiLinkedin} />
            </a>
          </div>
          <div className={styles.privatebuttoncircle}>
            <a href="https://docs.google.com/viewer?url=https://coralify.com/wp-content/themes/ThemeCoralifyv1/assets/pdf/1534275.pdf">
              <img src={path.download} className={styles.bcircle} />
            </a>

            <a href="">
              <img src={path.share} className={styles.bcircle} />
            </a>
          </div>
        </div>
        {/* <div className={styles.publicbutton}>
          <h2 className={styles.idcertificate}>ID certificado: 1534275</h2>
          <button>Verificar Certificado</button>
        </div> */}
        <div className={styles.institutiondata}>
          <h1 className={styles.title}>{certificateInfo.credential.title?certificateInfo.credential.title: "No tiene titulo" }</h1>
          <div className={styles.rrss}>
            <a href="">
              <img src={path.linkedin} className={styles.rrsscircle} />
            </a>
            <a href="">
              <img src={path.facebook} className={styles.rrsscircle} />
            </a>
            <a href="">
              <img src={path.youtube} className={styles.rrsscircle} />
            </a>
            <a href="">
              <img src={path.whatsapp} className={styles.rrsscircle} />
            </a>
            <a href="">
              <img src={path.instagram} className={styles.rrsscircle} />
            </a>
          </div>
          <hr className={styles.line}></hr>
          <div className={styles.wrappdata}>
            <img src={path.logo} className={styles.logoinstitution} />
            <div className={styles.nameinstitution}>
              <h2>{certificateInfo.credential.name_institution}</h2>
              <a href="">https://codeable.pe</a>
            </div>

            <div className={styles.datauser}>
      <h2 className={styles.nameuser}>{bootcamper.name ? bootcamper.name: ""} {bootcamper.last_name? bootcamper.last_name: ""}</h2>
              <p className={styles.etiquetauser}>Bootcamper</p>
            </div>
          </div>
          <hr className={styles.line}></hr>
          <div className={styles.description}>
            <p>
              {certificateInfo.credential.description? certificateInfo.credential.description: "No tiene descripción"}
            </p>
          </div>
          <div className={styles.datevalidate}>
            <h3 className={styles.datevalidateh3}>
              Emitido el: 13 de septiembre 2020
            </h3>
            <h3 className={styles.datevalidateh3}>Expira el: {certificateInfo.credential.expiration_at ? certificateInfo.credential.expiration_at: "Nunca expira"}</h3>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
}