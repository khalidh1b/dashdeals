import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/component/ui/tooltip";
import PropTypes from 'prop-types';

export const ToolTip = ({ trigger, element }) => {
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>{trigger}</TooltipTrigger>
                    <TooltipContent>
                    <p>{element}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    )
};

ToolTip.propTypes = {
    trigger: PropTypes.any,
    element: PropTypes.string
};