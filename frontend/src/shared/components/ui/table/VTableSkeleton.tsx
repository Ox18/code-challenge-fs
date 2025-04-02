import VSkeletonText from "../skeleton/VSkeletonText";
import VTableBody from "./VTableBody";
import VTableColumn from "./VTableColumn";
import VTableHead from "./VTableHead";
import VTableItem from "./VTableItem";
import VTableRow from "./VTableRow";

export default function VTableSkeleton() {
  return (
    <table>
      <VTableHead>
        <VTableColumn>
          <VSkeletonText />
        </VTableColumn>
        <VTableColumn>
          <VSkeletonText />
        </VTableColumn>
        <VTableColumn>
          <VSkeletonText />
        </VTableColumn>
        <VTableColumn>
          <VSkeletonText />
        </VTableColumn>
        <VTableColumn>
          <VSkeletonText />
        </VTableColumn>
      </VTableHead>
      <VTableBody>
        <VTableRow>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
        </VTableRow>
        <VTableRow>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
        </VTableRow>
        <VTableRow>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
        </VTableRow>
        <VTableRow>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
          <VTableItem>
            <VSkeletonText />
          </VTableItem>
        </VTableRow>
      </VTableBody>
    </table>
  );
}
