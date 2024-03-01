import { borderTop, wrapper, container, cardWrapper, toolbar } from './app.css';
import { Card } from '@ssoon-servey/shared-ui';
import ToolBar from './components/ToolBar';
import SurveyItem from './components/SurveyItem';
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
    handleAddItems,
    handleAddSections,
    onSubmit,
  } = useSurveyViewModel();

  return (
    <div className={container}>
      <div className={wrapper}>
        <Card>
          <div className={cardWrapper}>
            <div className={borderTop} />
            <div>
              <input
                placeholder="설문지 제목"
                name="title"
                value={survey.title}
                onChange={handleSurveyInput}
              />
            </div>
            <div>
              <input
                placeholder="설문지 설명"
                name="description"
                value={survey.description}
                onChange={handleSurveyInput}
              />
            </div>
          </div>
        </Card>
        {surveySections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div>{`section ${sectionIndex + 1}`}</div>
            {section.items.map((item, itemIndex) => (
              <SurveyItem
                key={`${sectionIndex}_${itemIndex}`}
                item={item}
                onActiveItem={() => handleActiveItem(sectionIndex, itemIndex)}
                onAddOptions={handleAddOption}
                onChangeOptionText={handleChangeOptionText}
                onChangeItemTitle={handleChangeItemTitle}
              />
            ))}
          </div>
        ))}
        <div className={toolbar}>
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
