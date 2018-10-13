import {ABCBlock, ScoreElement} from "./Types";
import {generateInlineStyle} from "./Scrapbox";
import {parseLink, render} from "./ABC";

export class ABCPage {
    private scoreElements: ScoreElement[] = [];

    private pushScoreElement = (block: ABCBlock): void => {
        const {titleElementID, titleElement, blockHeight, abc, isEditing} = block;
        const scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("id", `ABC${titleElementID}`);
        scoreDiv.setAttribute("style", generateInlineStyle(isEditing, blockHeight));

        const svgDiv = document.createElement("div");
        const svgDivID = `SVG${titleElementID}`;
        svgDiv.setAttribute("id", svgDivID);

        const playerDiv = document.createElement("div");
        const playerDivID = `PLAYER${titleElementID}`;
        playerDiv.setAttribute("id", playerDivID);

        scoreDiv.appendChild(svgDiv);
        scoreDiv.appendChild(playerDiv);
        block.titleElement.appendChild(scoreDiv);
        this.scoreElements.push({
            parentElementID: titleElementID,
            element: scoreDiv
        });
        //楽譜描画
        console.log(titleElement.clientWidth);
        render(abc, parseLink(abc), titleElement.clientWidth - 30, svgDivID, playerDivID);
    };

    private getElement = (elementID: string): ScoreElement => {
        if (this.scoreElements.length < 1) return null;
        for (let scoreElement of this.scoreElements) {
            if (scoreElement.parentElementID === elementID) {
                return scoreElement;
            }
        }
        return null;
    };

    private updateElement = (block: ABCBlock): boolean => {
        const scoreElement = this.getElement(block.titleElementID);
        if (!scoreElement) {
            return false;
        }
        scoreElement.element.setAttribute("style", generateInlineStyle(block.isEditing, block.blockHeight));
        //楽譜描画
        return true;
    };

    public update = (newAbcBlocks: ABCBlock[]): void => {
        for (let newBlock of newAbcBlocks) {
            if (!this.updateElement(newBlock)) {
                this.pushScoreElement(newBlock);
            }
        }
    }
}