import {
  borderTop,
  wrapper,
  container,
  cardWrapper,
  toolbar,
  surveyTitle,
  surveySubTitle,
  sectionWrapper,
  itemsContainer,
  sectionLabel,
  sectionsContainer,
} from './app.css';
import { Block, Card } from '@ssoon-servey/shared-ui';
import ToolBar from './components/ToolBar';
import SurveyItem from './components/SurveyItem';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import useSurveyViewModel from './hooks/viewmodel/useSurveyViewModel';

export default function App() {
  const {
    survey,
    handleSurveyInput,
    surveySections,
    handleActiveItem,
    handleAddOption,
    handleChangeOptionText,
    handleChangeItemTitle,
    handleChangeItemType,
    handleAddItems,
    handleChangeItemRequired,
    handleAddSections,
    handleDeleteItem,
    onSubmit,
    toolbarTop,
    currentActiveItemIndex,
  } = useSurveyViewModel();

  const { sectionId, itemId } = currentActiveItemIndex;

  return (
    <div className={container}>
      <div className={wrapper}>
        <Card>
          <div className={cardWrapper}>
            <div className={borderTop} />
            <div>
              <input
                type="text"
                className={surveyTitle}
                placeholder="설문지 제목"
                name="title"
                value={survey.title}
                onChange={handleSurveyInput}
              />
            </div>
            <Block height={20} />
            <div>
              <input
                placeholder="설문지 설명"
                className={surveySubTitle}
                name="description"
                value={survey.description}
                onChange={handleSurveyInput}
              />
            </div>
          </div>
        </Card>
        <Block height={40} />
        <div className={sectionsContainer}>
          {surveySections.map((section, sectionIndex) => (
            <div key={section.id} className={sectionWrapper}>
              <div className={sectionLabel}>{`${surveySections.length} 중 ${
                sectionIndex + 1
              } 섹션`}</div>
              <div className={itemsContainer}>
                {section.items.map((item, itemIndex) => (
                  <SurveyItem
                    key={`${section.id}_${itemIndex}`}
                    isActive={
                      sectionId === sectionIndex && itemId === itemIndex
                    }
                    item={item}
                    onActiveItem={(top) =>
                      handleActiveItem(sectionIndex, itemIndex, top)
                    }
                    onAddOptions={handleAddOption}
                    onChangeOptionText={handleChangeOptionText}
                    onChangeItemType={handleChangeItemType}
                    onChangeItemRequired={handleChangeItemRequired}
                    onChangeItemTitle={handleChangeItemTitle}
                    onDeleteItem={() =>
                      handleDeleteItem(sectionIndex, itemIndex)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className={toolbar}
          style={assignInlineVars({ top: `${toolbarTop}px` })}
        >
          <ToolBar
            onAddItems={handleAddItems}
            onAddSections={handleAddSections}
          />
        </div>
        <button onClick={onSubmit}>제출하기</button>
      </div>
    </div>
  );
}
