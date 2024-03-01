import React from 'react';
import {
  type SurveySection,
  type Survey,
  useCreateSurvey,
  type SurveyItem as Item,
} from '../query/useServey';
import { insertItem } from '@ssoon-servey/utils';
import { useState } from 'react';
import { produce } from 'immer';

let id = 0;
const genId = () => {
  return ++id;
};

const newItem = (): Item => ({
  title: '',
  type: 'radio',
  required: false,
  options: [{ text: '옵션1' }],
});
const newSection = (): SurveySection & { id: number } => ({
  id: genId(),
  title: undefined,
  items: [newItem()],
});

const useSurveyViewModel = () => {
  const [survey, setSurvey] = useState<Omit<Survey, 'sections'>>({
    title: '',
    description: '',
  });
  const [currentActiveItemIndex, setCurrentActiveItemIndex] = useState({
    sectionId: 0,
    itemId: 0,
  });

  const [surveySections, setSurveySections] = useState<
    (SurveySection & { id: number })[]
  >([newSection()]);

  const mutate = useCreateSurvey();

  const handleSurveyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setSurvey((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddItems = () => {
    const { sectionId, itemId } = currentActiveItemIndex;
    const nextItemId = itemId + 1;

    setSurveySections((sections) =>
      produce(sections, (sections) => {
        const section = sections[sectionId];
        section.items = insertItem(section.items, nextItemId, newItem());
      })
    );

    setCurrentActiveItemIndex((prev) => ({
      ...prev,
      itemId: nextItemId,
    }));
  };

  const handleAddOption = () => {
    const { sectionId, itemId } = currentActiveItemIndex;
    setSurveySections((sections) =>
      produce(sections, (sections) => {
        const section = sections[sectionId];
        const item = section.items[itemId];
        item.options.push({
          text: 'radio option 1번 째',
        });
      })
    );
  };

  const handleAddSections = () => {
    const { sectionId } = currentActiveItemIndex;
    const nextSectionId = sectionId + 1;
    setSurveySections((section) =>
      insertItem(section, nextSectionId, newSection())
    );
    setCurrentActiveItemIndex((prev) => ({
      ...prev,
      sectionId: nextSectionId,
    }));
  };

  const handleActiveItem = (sectionId: number, itemId: number) => {
    setCurrentActiveItemIndex({ sectionId, itemId });
  };

  const handleChangeItemTitle = (value: string) => {
    const { sectionId, itemId } = currentActiveItemIndex;

    setSurveySections((sections) =>
      produce(sections, (sections) => {
        const section = sections[sectionId];
        const item = section.items[itemId];
        item.title = value;
      })
    );
  };

  const handleChangeOptionText = (value: string, optionIndex: number) => {
    const { sectionId, itemId } = currentActiveItemIndex;

    setSurveySections((sections) =>
      produce(sections, (sections) => {
        const section = sections[sectionId];
        const item = section.items[itemId];
        const option = item.options[optionIndex];
        option.text = value;
      })
    );
  };

  const onSubmit = () => {
    mutate({
      title: survey.title,
      description: survey.description,
      sections: surveySections.map((section) => ({
        title: section.title,
        items: section.items,
      })),
    });
  };
  return {
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
  };
};

export default useSurveyViewModel;
