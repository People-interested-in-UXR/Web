import { Fragment } from "react";
import { ProfileCard } from "../Profile/ProfileCard";

const ProfileCardList = ({
  users,
  selectedChip,
  setToastMessage,
}: {
  users: any;
  selectedChip: any;
  setToastMessage: any;
}) => {
  return (
    <>
      {[...users].map((user, index) =>
        selectedChip === "전체" ? (
          <Fragment key={index}>
            <ProfileCard {...user} onClick={setToastMessage} />
          </Fragment>
        ) : (
          user?.position === selectedChip && (
            <Fragment key={index}>
              <ProfileCard {...user} onClick={setToastMessage} />
            </Fragment>
          )
        )
      )}
    </>
  );
};

export default ProfileCardList;
