import { Fragment } from "react";
import PostCard from "./PostCard";

const PostCardList = ({
  database,
  selectedChip,
  breadcrumb,
}: {
  database: any;
  selectedChip: any;
  breadcrumb: any;
}) => {
  return (
    <>
      {[...database?.pages].map((page, index) =>
        selectedChip === "전체" ? (
          <Fragment key={index}>
            {<PostCard page={page} breadcrumb={breadcrumb} />}
          </Fragment>
        ) : (
          page?.properties["모임유형"]?.select?.name === selectedChip && (
            <Fragment key={index}>
              <PostCard page={page} breadcrumb={breadcrumb} />
            </Fragment>
          )
        )
      )}
    </>
  );
};

export default PostCardList;
