// Server Component — fetches room data, delegates interactive grid to RoomsClient
import { useTranslations } from "next-intl";
import { getRooms } from "@/lib/data";
import RoomsClient from "./RoomsClient";
import styles from "./RoomsSection.module.css";

interface RoomsSectionProps {
  locale: string;
}

export default function RoomsSection({ locale }: RoomsSectionProps) {
  const t = useTranslations("rooms");
  const rooms = getRooms();

  return (
    <section
      id="rooms"
      data-section="rooms"
      data-nav-scheme="light"
      className={styles.section}
      aria-labelledby="roomsHeading"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} cp12-reveal`}>
          <div>
            <div className={styles.label} aria-hidden="true">
              {t("label")}
            </div>
            <h2
              id="roomsHeading"
              className={styles.heading}
              dangerouslySetInnerHTML={{ __html: t.raw("heading") }}
            />
          </div>
          <p className={styles.intro}>{t("intro")}</p>
        </div>

        <RoomsClient rooms={rooms} locale={locale} />
      </div>
    </section>
  );
}
