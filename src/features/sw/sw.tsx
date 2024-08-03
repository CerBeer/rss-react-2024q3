// import { useAppSelector, useAppDispatch } from "../../hooks";
import SearchInput from "../../components/searchInput/searchInput";
// import Spinner from "../../components/spinner/spinner";
// import Result from "../../components/result/result";
// import ThemeSwitch from "../../components/themeSwitch/themeSwitch";
// import Flyout from "../../components/flyout/flyout";

function SW() {
  return (
    <div className="root-theme" data-testid="root-theme">
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput />
      {/* {isFetching ? <Spinner /> : <Result data={data!} />}
      <ThemeSwitch />
      <Flyout /> */}
    </div>
  );
}

export default SW;
