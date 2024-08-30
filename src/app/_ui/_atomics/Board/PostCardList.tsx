import { Fragment } from "react";
import PostCard from "./PostCard";
import { User } from "@/app/utils/types/user/user";
import CardContainer from "./CardContainer";

const PostCardList = ({
  database,
  selectedChip,
  breadcrumb,
  loggedInUser,
  isMyPostCard,
}: {
  database: any;
  selectedChip: any;
  breadcrumb: any;
  loggedInUser?: User;
  isMyPostCard: boolean;
}) => {
  return (
    <CardContainer>
      {[...database?.pages].map((page, index) =>
        selectedChip === "전체" ? (
          <Fragment key={index}>
            {isMyPostCard ? (
              loggedInUser?.email ===
                page?.properties["작성자 이메일"]?.email && (
                <PostCard
                  page={page}
                  breadcrumb={breadcrumb}
                  loggedInUser={loggedInUser}
                />
              )
            ) : (
              <PostCard
                page={page}
                breadcrumb={breadcrumb}
                loggedInUser={loggedInUser}
              />
            )}
          </Fragment>
        ) : (
          page?.properties["모임유형"]?.select?.name === selectedChip && (
            <Fragment key={index}>
              {isMyPostCard ? (
                loggedInUser?.email ===
                  page?.properties["작성자 이메일"]?.email && (
                  <PostCard
                    page={page}
                    breadcrumb={breadcrumb}
                    loggedInUser={loggedInUser}
                  />
                )
              ) : (
                <PostCard
                  page={page}
                  breadcrumb={breadcrumb}
                  loggedInUser={loggedInUser}
                />
              )}
            </Fragment>
          )
        )
      )}
    </CardContainer>
  );
};

export default PostCardList;
