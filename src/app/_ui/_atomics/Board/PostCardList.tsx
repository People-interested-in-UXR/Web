import { Fragment } from "react";
import PostCard from "./PostCard";
import { User } from "@/app/utils/types/user/user";

const PostCardList = ({
  database,
  selectedChip,
  breadcrumb,
  loggedInUser,
}: {
  database: any;
  selectedChip: any;
  breadcrumb: any;
  loggedInUser?: User;
}) => {
  return (
    <>
      {[...database?.pages].map((page, index) =>
        selectedChip === "전체" ? (
          <Fragment key={index}>
            {
              <PostCard
                page={page}
                breadcrumb={breadcrumb}
                loggedInUser={loggedInUser}
              />
            }
          </Fragment>
        ) : (
          page?.properties["모임유형"]?.select?.name === selectedChip && (
            <Fragment key={index}>
              <PostCard
                page={page}
                breadcrumb={breadcrumb}
                loggedInUser={loggedInUser}
              />
            </Fragment>
          )
        )
      )}
    </>
  );
};

export default PostCardList;
