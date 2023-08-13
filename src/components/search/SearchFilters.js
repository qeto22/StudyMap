import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import "./SearchFilters.css"
import { ExpandMoreOutlined } from "@mui/icons-material";
import { useState } from "react";
import AmountRange from "./AmountRange";
import StartRatingsRadioButtonGroup from "./StartRatingsRadioButtonGroup";
import CategoriesList from "./CategoriesList";
import ContentTypeCombo from "./ContentTypeCombo";

function SearchFilters() {
  const [isCategoriesFilterOpen, setCategoriesFilterOpen] = useState(true);
  const [isRatingFilterOpen, setRatingFilterOpen] = useState(true);
  const [isPriceFilterOpen, setPriceFilterOpen] = useState(true);

  return (
    <div className="search-filters-wrapper">
      <ContentTypeCombo></ContentTypeCombo>
      <Accordion expanded={isCategoriesFilterOpen} onChange={() => setCategoriesFilterOpen(!isCategoriesFilterOpen)}>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined color="primary" />}
          aria-controls="search-content"
          id="search-filter-rating"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CategoriesList />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={isRatingFilterOpen} onChange={() => setRatingFilterOpen(!isRatingFilterOpen)}>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined color="primary" />}
          aria-controls="search-content"
          id="search-filter-rating"
        >
          <Typography>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StartRatingsRadioButtonGroup />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={isPriceFilterOpen} onChange={() => setPriceFilterOpen(!isPriceFilterOpen)}>
        <AccordionSummary
          expandIcon={<ExpandMoreOutlined color="primary" />}
          aria-controls="search-content"
          id="search-filter-price"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AmountRange />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default SearchFilters;